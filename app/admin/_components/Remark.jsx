"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { addRemark } from "@/Actions/Remark";
import { Separator } from "@/components/ui/separator";

const Remark = ({ details }) => {
  const [remark, setRemark] = useState("");
  const [remarks, setRemarks] = useState(details?.remark || []);

  const handleAddRemark = async () => {
    if (!remark.trim()) return toast.error("Remark cannot be empty");

    const result = await addRemark(details.id, remark);
    if (result.success) {
      toast.success("Remark added successfully");
      setRemarks((prev) => [
        ...prev,
        { id: Date.now(), text: remark, addedBy: "You", createdAt: new Date(), complaintId: details.id },
      ]);
    } else {
      toast.error(result.message || "Failed to add remark");
    }
    setRemark("");
  };

  return (
    <div className="max-w-5xl mx-auto mt-15 space-y-8 ">
      {/* Heading */}
      <h2 className="text-4xl font-bold shiny-header text-center">Remarks</h2>

      {/* Remark Input */}
      <div className="space-y-3 px-4 sm:px-0">
        <Textarea
          placeholder="Write your remark here..."
          className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-xl p-3"
          rows={4}
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
        />
          <Button onClick={handleAddRemark} className="shiny-btn">
            Add Remark
          </Button>
      </div>

      <Separator  />

      {/* Previous Remarks */}
      <div className="space-y-4 px-4 sm:px-0">
      <h2 className="text-2xl shiny-header text-center">Previous Remarks</h2>
        {remarks.length > 0 ? (
          remarks.map((r, index) => (
            <React.Fragment key={r.id}>
              <div className="flex items-start space-x-3">
                <span className="mt-1 text-gray-400">•</span>
                <div>
                  <p className="text-gray-100 font-medium">{r.text}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    by {r.addedBy} • {new Date(r.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              {index < remarks.length - 1 && <Separator className="border-gray-700" />}
            </React.Fragment>
          ))
        ) : (
          <p className="text-gray-400 italic text-center">No remarks yet</p>
        )}
      </div>
    </div>
  );
};

export default Remark;
