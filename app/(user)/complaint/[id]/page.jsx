import { getComplaintById } from '@/Actions/Complaint';
import React from 'react'
import ComplaintDetailsPage from '../_components/complaintDetails';

const Page = async ({ params }) => {
  const { id } = await params; // ✅ await params
  const complaintId = Number(id); // safer than parseInt

  if (isNaN(complaintId)) {
    throw new Error("Invalid complaint id");
  }

  const complaint = await getComplaintById(complaintId);

  console.log(complaint?.data);

  return (
    <div>
        <ComplaintDetailsPage complaint={complaint?.data} />
    </div>
  )
}

export default Page;
