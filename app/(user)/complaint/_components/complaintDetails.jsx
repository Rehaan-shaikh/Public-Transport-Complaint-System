"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Calendar, Truck, User, AlertCircle, MessageSquare, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ComplaintDetailsPage({ complaint }) {
  const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.8 } } };
  const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
  const slideUp = { hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1 } };

  if (!complaint) return <div className="text-center mt-10">Complaint not found</div>;

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="container min-h-screen bg-gradient-to-b from-background to-muted/20 mx-auto px-4 py-12 flex justify-center">
      <motion.section initial="hidden" animate="visible" variants={staggerContainer} className="space-y-8 w-full max-w-4xl">
        {/* Complaint Details Card */}
        <motion.div variants={slideUp}>
          <Card className="bg-background/80 backdrop-blur-sm border-border/50 shadow-lg">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-2xl flex items-center gap-2">
              <AlertCircle className="h-6 w-6 text-red-500" />
              Status: {complaint.status === "in_progress" ? "In Progress" : "Resolved"}
            </CardTitle>

            {/* Back to Tracking */}
            <Link
              href="/complaint"
              className="flex items-center gap-1 text-sm font-bold text-[#185b30] opacity-80 hover:opacity-100 transition-opacity"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Tracking
            </Link>
          </CardHeader>
            <CardContent className="space-y-4">
              {/* Submitted Info */}
              <div className="flex items-center gap-4">
                <User className="h-5 w-5 text-[#185b30]" />
                <div>
                  <h3 className="font-medium">Submitted by</h3>
                  <p className="text-muted-foreground">{complaint.contactName}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Calendar className="h-5 w-5 text-[#185b30]" />
                <div>
                  <h3 className="font-medium">Submitted on</h3>
                  <p className="text-muted-foreground">{formatDate(complaint.submittedAt)}</p>
                </div>
              </div>

              <Separator />

              {/* Complaint Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Truck className="h-5 w-5 text-[#185b30]" />
                    <div>
                      <h3 className="font-medium">Transport Mode</h3>
                      <p className="text-muted-foreground">{complaint.transport}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Truck className="h-5 w-5 text-[#185b30]" />
                    <div>
                      <h3 className="font-medium">Vehicle Number</h3>
                      <p className="text-muted-foreground">{complaint.vehicleNo}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <MapPin className="h-5 w-5 text-[#185b30]" />
                    <div>
                      <h3 className="font-medium">Location</h3>
                      <p className="text-muted-foreground">{complaint.location}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Truck className="h-5 w-5 text-[#185b30]" />
                    <div>
                      <h3 className="font-medium">Issue Type</h3>
                      <p className="text-muted-foreground">{complaint.issueType}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Calendar className="h-5 w-5 text-[#185b30]" />
                    <div>
                      <h3 className="font-medium">Date of Incident</h3>
                      <p className="text-muted-foreground">{formatDate(complaint.dateOfIncident)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Mail className="h-5 w-5 text-[#185b30]" />
                    <div>
                      <h3 className="font-medium">Contact Info</h3>
                      <p className="text-muted-foreground">{complaint.contactEmail}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h3 className="font-medium flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-[#185b30]" />
                  Description
                </h3>
                <p className="text-muted-foreground">{complaint.description}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Admin Remarks Section */}
        <motion.section variants={staggerContainer} className="space-y-6 mt-10">
          {/* Heading with icon */}
          <motion.div variants={slideUp} className="flex items-center gap-2 mb-4">
            <MessageSquare className="h-6 w-6 text-[#185b30]" />
            <h2 className="text-3xl font-bold text-[#185b30]">Admin Remarks</h2>
          </motion.div>

          {complaint.remark.length > 0 ? (
            <div className="space-y-4">
              {complaint.remark.map((r) => (
                <motion.div key={r.id} variants={slideUp}>
                  <Card className="bg-[#185b30]/5 backdrop-blur-sm border-[#185b30]/30 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg">
                    <CardContent className="p-5">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-semibold text-[#185b30]">{r.addedBy}</span>
                        <span className="text-sm text-muted-foreground">{formatDate(r.createdAt)}</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{r.text}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div variants={slideUp} className="text-center py-8 text-muted-foreground italic">
              No admin remarks have been added for this complaint yet.
            </motion.div>
          )}
        </motion.section>
      </motion.section>
    </div>
  );
}
