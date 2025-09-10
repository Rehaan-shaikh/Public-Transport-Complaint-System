"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateComplaintStatus } from "@/Actions/Complaint";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

const ComplaintsDetails = ({ details }) => {
  const [status, setStatus] = useState(details?.status || "pending");
  const [loading, setLoading] = useState(false);

  if (!details) return <p className="text-gray-400">No details available</p>;

  

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const res = await updateComplaintStatus(details.id, status);
      if (res.success) toast.success("Status updated successfully!");
      else toast.error(res.message || "Failed to update status.");
    } catch (err) {
      console.error(err);
      toast.error("Error while updating status");
    } finally {
      setLoading(false);
    }
  };

  const infoItems = [
    { label: "Transport", value: details.transport },
    { label: "Issue Type", value: details.issueType },
    { label: "Vehicle No", value: details.vehicleNo },
    { label: "Location", value: details.location },
    { label: "Date of Incident", value: new Date(details.dateOfIncident).toLocaleDateString() },
    { label: "Description", value: details.description },
    { label: "Submitted By", value: details.isAnonymous ? "Anonymous" : details.contactName },
    { label: "Email", value: !details.isAnonymous ? details.contactEmail : "-" },
    { label: "Submitted At", value: new Date(details.submittedAt).toLocaleString() },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
   <Link
      href="/dashboard"
      className="inline-flex items-center gap-2 text-[#706f6fe9] hover:text-[#b2b2b2e9] font-medium mb-4"
    >
      <ArrowLeft size={20} />
      Back to Dashboard
    </Link>

      {/* Complaint Card */}
      <Card className="bg-background shadow-2xl rounded-2xl  p-6">
        <CardHeader className="flex justify-between items-center mb-6">
          <CardTitle className="text-3xl font-bold shiny-header">Complaint Details</CardTitle>
            <Badge
              className={`capitalize px-4 py-2 ${
                status === "pending"
                  ? "bg-[#a23333] text-white"
                  : status === "in_progress"
                  ? "shiny-badge"
                  : "bg-[#185b30] text-white"
              }`}
            >
              {status.replace("_", " ")}
            </Badge>
        </CardHeader>

        <CardContent>
          {/* Two Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {infoItems.map((item, idx) => (
              <div key={idx}>
                <p className="font-semibold text-gray-300">{item.label}:</p>
                <p className="text-gray-400">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Status Dropdown */}
          <div className="mt-6 flex items-center gap-4">
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-48 bg-gray-800 text-white">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={handleUpdate}
              disabled={loading}
              className="px-6 py-2 shiny-btn"
            >
              {loading ? <>Updating <Loader2 /> </>: "Update Status"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Media Files */}
      {details.mediaFiles && details.mediaFiles.length > 0 && (
        <div className="space-y-4">
          <p className="font-semibold text-lg shiny-header">Attached Media:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {details.mediaFiles.map((file, index) => (
              <div key={index} className="rounded-xl overflow-hidden border border-gray-700">
                {file.type === "image" ? (
                  <img src={file.url} alt={`media-${index}`} className="w-full h-60 object-cover" />
                ) : (
                  <video src={file.url} controls className="w-full h-60 object-cover" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintsDetails;
