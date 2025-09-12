"use server";

import { z } from "zod";
import { uploadMedia } from "@/lib/convertFiles";
import { getCurrentUser } from "./User";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { sendStatusUpdateEmail } from "./send-email";



const complaintSchema = z.object({
  transport: z.string().min(1, "Transport is required"),
  issueType: z.string().min(1, "Issue type is required"),
  vehicleNo: z.string().min(1, "Vehicle No is required"),
  location: z.string().min(1, "Location is required"),
  dateOfIncident: z.string().min(1, "Date is required"),
  description: z.string().min(5, "Description must be at least 5 chars"),
  isAnonymous: z.string().optional(),
  contactName: z.string().optional(),
  contactEmail: z.string().email().optional(),
});

export async function submitComplaint(prevData, formData) {
  try {
    const user = await getCurrentUser();

    // Extract values
    const values = Object.fromEntries(formData.entries());

    // Grab all media files (array of stringified objects)
    const mediaFilesRaw = formData.getAll("mediaFiles") || [];  //like: "url":"https://...jpg","type":"image"
    const mediaFiles = mediaFilesRaw.map((str) => JSON.parse(str)); // parse back to objects

    // this syntax {fieldname : xyz , ...new obj name} from destructuring , take out "mediaFiles" into _skip (wont used) and keep the rest in valuesToValidate
    // (excluding mediaFiles since schema not expect it)
    const { mediaFiles: _skip, ...valuesToValidate } = values;

    // safeParse is a zod function, checks values against schema and returns result
    const result = complaintSchema.safeParse(valuesToValidate);

    if (!result.success) {
      const errors = {};
      result.error.issues.forEach((err) => {
        errors[err.path[0]] = err.message;
      });
      return { success: false, errors, values };
    }

    const data = result.data;

    // Handle anonymous fields
    const isAnon = !!data.isAnonymous;
    const contactName = isAnon ? "Anonymous" : data.contactName || "Anonymous";
    const contactEmail = isAnon ? "Anonymous" : data.contactEmail || "Anonymous";

    // Save complaint
    const complaint = await db.complaint.create({
      data: {
        ...data,
        mediaFiles, // array of {url, type}
        dateOfIncident: data.dateOfIncident
          ? new Date(data.dateOfIncident)  //converting string to date
          : null,
        contactName,
        contactEmail,
        userId: user?.id || null,  //Foreign key , for connecting with the user table (can also use connect from prisma)
      },
    });

    return { success: true, complaint, errors: {}, values: {} };
  } catch (err) {
    console.error("Error submitting complaint:", err);
    return {
      success: false,
      errors: { general: "Something went wrong. Please try again." },
      values: {},
    };
  }
}



export async function getAllComplaintsByPagination(page = 1, limit = 10) {  //if  nothing provided it sets defaul 1 and 10
  try {
    const skip = (page - 1) * limit

    const [complaints, totalCount] = await Promise.all([  //Promise.all([...]) is a built-in JavaScript method that runs both queries at the same time (parallaly)which is (faster).
      db.complaint.findMany({
        //skip and take r the prisma keywords
        skip,  // skip → how many records to ignore before fetching (like OFFSET in SQL)
        take: limit,   // take → how many records to fetch (like LIMIT in SQL)
        orderBy: { createdAt: "desc" },
      }),
      db.complaint.count(),
    ])

    return {
      success: true,
      complaints,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      // Math.ceil() is a JavaScript built-in method from the Math object.
      // rounds up to the next whole number, so you don’t miss the last partially filled page.
    }
  } catch (err) {
    console.error("Error fetching complaints:", err)
    return {
      success: false,
      complaints: [],
      totalCount: 0,
      totalPages: 0,
      error: "Failed to fetch complaints",
    }
  }
}

export async function getComplaintById(id) {
  try {
    const complaint = await db.complaint.findUnique({
      where: { id },
      include: { remark: true },
    });
    if (!complaint) {
      return { success: false, complaint: null, message: "Complaint not found" };
    }
    return { success: true, data : complaint };
  } catch (err) {
    console.error("Error fetching complaint by ID:", err);
    return { success: false, complaint: null, message: "Error fetching complaint" };
  }
}


export async function updateComplaintStatus(id, status) {
  try {
    const complaint = await db.complaint.findUnique({
      where: { id },
    });

    if (!complaint) {
      return {
        success: false,
        complaint: null,
        message: "Complaint not found",
      };
    }

    // Build update data
    const updateData = { status };

    if (status === "in_progress") {
      updateData.inProgressAt = new Date();
    } else if (status === "resolved") {
      updateData.resolvedAt = new Date();
    }
    
    const updatedComplaint = await db.complaint.update({
      where: { id: complaint.id },
      data: updateData,
    });
    // console.log(" complaint:", complaint);

    if(complaint.contactEmail != "Anonymous"){
      await sendStatusUpdateEmail(complaint, status);
    }
    revalidatePath("/");

    return { success: true, data: updatedComplaint };
  } catch (err) {
    console.error("Error updating complaint status:", err);
    return {
      success: false,
      complaint: null,
      message: "Error updating complaint",
    };
  }
}



export async function getUserComplaints() {
  const user = await getCurrentUser();
  if(!user){
    return { success: false, complaints: [], message: "User not authenticated" };
  }
  try {
    const complaints = await db.complaint.findMany({
      where: { userId: user.id },
      include: { remark: true },
        orderBy: { createdAt: "desc" },
    });
    return { success: true, data :complaints}
  } catch (err) {
    console.error("Error fetching user complaints:", err);
    return { success: false, complaints: [], message: "Error fetching complaints" };
  }
}



export async function getComplaintTimestamps() {
  try {
    const complaints = await db.complaint.findMany({
      select: {
        inProgressAt: true,
        resolvedAt: true,
      },
      orderBy: { createdAt: "asc" },
    });

    const data = complaints.map((c) => ({
      statusTimestamps: {
        inProgressAt: c.inProgressAt ? c.inProgressAt.toISOString() : null,
        resolvedAt: c.resolvedAt ? c.resolvedAt.toISOString() : null,
      },
    }));

    return { success: true, data };
  } catch (err) {
    console.error("Error fetching complaint timestamps:", err);
    return { success: false, data: [], error: "Failed to fetch complaint timestamps" };
  }
}








