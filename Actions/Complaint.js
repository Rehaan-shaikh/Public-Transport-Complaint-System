"use server";

import { z } from "zod";
import { uploadMedia } from "@/lib/convertFiles";
import { getCurrentUser } from "./User";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
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

export async function submitComplaint(prevState, formData) {
  const user = await getCurrentUser();
  try {
    const values = Object.fromEntries(formData.entries());

    const result = complaintSchema.safeParse(values);

    if (!result.success) {
      const errors = {};
      result.error.issues.forEach((err) => {
        errors[err.path[0]] = err.message;
      });
      return { errors, success: false, values }; // 👈 preserve user data
    }

    const data = result.data;

    // ✅ Upload media files
    const files = formData.getAll("media");
    const mediaFiles = await uploadMedia(files);

    // ✅ Handle anonymity
    const isAnon = !!data.isAnonymous;
    const contactName = isAnon ? "Anonymous" : data.contactName || "Anonymous";
    const contactEmail = isAnon ? "Anonymous" : data.contactEmail || "Anonymous";

    const complaint = await db.complaint.create({
      data: {
        transport: data.transport,
        issueType: data.issueType,
        vehicleNo: data.vehicleNo,
        location: data.location,
        dateOfIncident: new Date(data.dateOfIncident),
        description: data.description,
        mediaFiles,
        isAnonymous: isAnon,
        contactName,
        contactEmail,
        userId: user.id,
      },
    });

    return { success: true, complaint, errors: {}, values: {} }; // reset values on success
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

    await sendStatusUpdateEmail(complaint, status);

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
      // orderBy: { updatedAt: "desc" },
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
