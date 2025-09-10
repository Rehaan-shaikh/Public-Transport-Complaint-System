import { getComplaintById } from "@/Actions/Complaint";
import ComplaintsDetails from "../../_components/Complaints-details";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import Remark from "../../_components/Remark";

const Page = async ({ params }) => {
  const { id } = await params;
  const complaintId = parseInt(id, 10);
  const complaint = await getComplaintById(complaintId);

  return (
    <div className="bg-black min-h-screen p-6 space-y-6">
      {/* Complaint Details */}
      <ComplaintsDetails details={complaint.data} />

      {/* Remarks Section */}
      <Remark details={complaint.data} />
    </div>
  );
};

export default Page;
