"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addRemark(complaintId, text, addedBy) {
  const admin = process.env.SUPER_ADMIN_EMAIL;
  
  try {
    const remark = await db.remark.create({
      data: {
        text,
        addedBy : admin, 
        complaint: {
          connect: { id: complaintId }, // link remark to complaint
        },
        //its optional to use connect , just by storing foreign key will also do the job
      },
    });
    revalidatePath("/");

    return {
      success: true,
      message: "Remark added successfully",
      remark,
    };
  } catch (error) {
    console.error("Error adding remark:", error);
    return {
      success: false,
      message: "Failed to add remark",
    };
  }
}


