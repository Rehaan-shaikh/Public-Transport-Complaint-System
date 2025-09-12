"use client";

import { useActionState, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { submitComplaint } from "@/Actions/Complaint";
import { toast } from "sonner";
import { UploadMediaInput } from "@/Elements/Image-Uplaod";
import { Loader2 } from "lucide-react";

export default function ComplaintForm() {
  const [state, formAction, isPending] = useActionState(submitComplaint, {
    success: false,
    errors: {},
    values: {},
  });

  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isUploading, setIsUploading] = useState(false)


  // ✅ sync switch state with form values
  useEffect(() => {
    if (state.values?.isAnonymous) {
      setIsAnonymous(true);
    }
  }, [state.values?.isAnonymous]);

  // ✅ Show toast on submit result
  useEffect(() => {
    if (state.success) {
      toast.success("Complaint submitted successfully!");
    } else if (state.errors?.general) {
      toast.error(state.errors.general);
    }
  }, [state]);

  return (
    <motion.div className="container min-h-screen bg-gradient-to-b from-background to-muted/20 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl mx-auto mt-10"
      >
        <Card className="h-full hover:shadow-md transition-shadow bg-background/90 backdrop-blur-sm border-border/50 rounded-2xl">
          <CardHeader>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <CardTitle className="text-2xl font-bold text-[#185b30] text-center">
                Submit a Complaint
              </CardTitle>
            </motion.div>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-6">
              {/* Transport */}
              <motion.div whileHover={{ scale: 1.02 }}>
                <Label className="font-medium">Transport</Label>
                <Select
                  name="transport"
                  defaultValue={state.values?.transport || ""}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select Transport" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bus">Bus</SelectItem>
                    <SelectItem value="Train">Train</SelectItem>
                    <SelectItem value="Metro">Metro</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {state.errors?.transport && (
                  <p className="text-red-500 text-sm mt-1">{state.errors.transport}</p>
                )}
              </motion.div>

              {/* Issue Type */}
              <div>
                <Label className="font-medium">Issue Type</Label>
                <RadioGroup
                  name="issueType"
                  className="flex flex-wrap gap-4 mt-2"
                  defaultValue={state.values?.issueType || ""}
                >
                  {[
                    { value: "busdelay", label: "Bus Delay" },
                    { value: "Overcrowding", label: "Overcrowding" },
                    { value: "RudeStaff", label: "Rude Staff" },
                    { value: "UncleanVehicle", label: "Unclean Vehicle" },
                    { value: "FaultyAC", label: "Faulty AC" },
                    { value: "Other", label: "Other" },
                  ].map((item) => (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      key={item.value}
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg shadow-sm"
                    >
                      <RadioGroupItem value={item.value} id={item.value} />
                      <Label htmlFor={item.value}>{item.label}</Label>
                    </motion.div>
                  ))}
                </RadioGroup>
                {state.errors?.issueType && (
                  <p className="text-red-500 text-sm mt-1">{state.errors.issueType}</p>
                )}
              </div>

              {/* Vehicle No */}
              <motion.div whileHover={{ scale: 1.02 }}>
                <Label htmlFor="vehicleNo" className="font-medium">
                  Vehicle No.
                </Label>
                <Input
                  name="vehicleNo"
                  placeholder="Enter vehicle number"
                  className="mt-2"
                  defaultValue={state.values?.vehicleNo || ""}
                />
                {state.errors?.vehicleNo && (
                  <p className="text-red-500 text-sm mt-1">{state.errors.vehicleNo}</p>
                )}
              </motion.div>

              {/* Location */}
              <motion.div whileHover={{ scale: 1.02 }}>
                <Label htmlFor="location" className="font-medium">
                  Location
                </Label>
                <Input
                  name="location"
                  placeholder="Enter location"
                  className="mt-2"
                  defaultValue={state.values?.location || ""}
                />
                {state.errors?.location && (
                  <p className="text-red-500 text-sm mt-1">{state.errors.location}</p>
                )}
              </motion.div>

              {/* Date of Incident */}
              <motion.div whileHover={{ scale: 1.02 }}>
                <Label htmlFor="dateOfIncident" className="font-medium">
                  Date of Incident
                </Label>
                <Input
                  type="date"
                  name="dateOfIncident"
                  className="mt-2"
                  defaultValue={state.values?.dateOfIncident || ""}
                />
                {state.errors?.dateOfIncident && (
                  <p className="text-red-500 text-sm mt-1">{state.errors.dateOfIncident}</p>
                )}
              </motion.div>

              {/* Description */}
              <motion.div whileHover={{ scale: 1.02 }}>
                <Label htmlFor="description" className="font-medium">
                  Description
                </Label>
                <Textarea
                  name="description"
                  placeholder="Describe the issue in detail..."
                  rows={4}
                  className="mt-2"
                  defaultValue={state.values?.description || ""}
                />
                {state.errors?.description && (
                  <p className="text-red-500 text-sm mt-1">{state.errors.description}</p>
                )}
              </motion.div>

              {/* Media Upload */}
              
              {/* <UploadMediaInput> renders hidden <input name="mediaFiles" /> fields.
               When the parent form submits, the browser automatically collects all inputs inside the form (including these), and formAction reads their values. */}
                <UploadMediaInput state={state} onUploadingChange={setIsUploading} />

              {/* Anonymous Switch */}
              <div className="flex items-center justify-between">
                <Label htmlFor="isAnonymous" className="font-medium">
                  Submit Anonymously
                </Label>
                <Switch
                  id="isAnonymous"
                  checked={isAnonymous}
                  onCheckedChange={(checked) => setIsAnonymous(checked)}
                />
                {/* Switch itself is just UI, real value comes from hidden input */}
                {/* cause switch return value as on if checked instead of true, and on unchecked it return nothing instead of false */}
                {/* this isnt a boolean value though, and thats y use of this hidden ip is optional  */}
                <input type="hidden" name="isAnonymous" value={isAnonymous ? "true" : "false"} />    
              </div>

              {/* Contact Info */}
              {!isAnonymous && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div>
                    <Label htmlFor="contactName">Your Name</Label>
                    <Input
                      name="contactName"
                      placeholder="Enter your name"
                      className="mt-2"
                      defaultValue={state.values?.contactName || ""}
                    />
                    {state.errors?.contactName && (
                      <p className="text-red-500 text-sm mt-1">{state.errors.contactName}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="contactEmail">Your Email</Label>
                    <Input
                      type="email"
                      name="contactEmail"
                      placeholder="Enter your email"
                      className="mt-2"
                      defaultValue={state.values?.contactEmail || ""}
                    />
                    {state.errors?.contactEmail && (
                      <p className="text-red-500 text-sm mt-1">{state.errors.contactEmail}</p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Submit */}
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  className="w-full bg-[#185b30] hover:bg-[#144b27] text-white font-semibold py-3 rounded-lg transition-all duration-200"
                  disabled={isPending || isUploading}
                >
                  {isPending ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    "Submit Complaint"
                  )}

                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
