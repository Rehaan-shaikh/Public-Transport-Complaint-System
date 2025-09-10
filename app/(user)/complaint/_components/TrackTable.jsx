"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

export default function TrackTable({ complaints }) {
  // const getStatusColor = (status) => {
  //   switch (status) {
  //     case "pending":
  //       return "bg-red-600 text-white";
  //     case "in_progress":
  //       return "bg-[#6c6a6a]";
  //     case "resolved":
  //       return "bg-[#185b30] text-white";
  //     default:
  //       return "bg-gray-400 text-white";
  //   }
  // };

  const router = useRouter();
  const HandleRowClick = (id) => {
    router.push(`/complaint/${id}`);
  };


  return (
    <motion.div className="container min-h-screen bg-gradient-to-b from-background to-muted/20 mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-6xl mx-auto mt-8"
    >
      <Card className="bg-background/90 backdrop-blur-sm border-border/50 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-[#185b30]">
            Your Complaint Records
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="overflow-x-auto rounded-lg"
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Transport Mode</TableHead>
                  <TableHead className="font-semibold">Issue Type</TableHead>
                  <TableHead className="font-semibold">Vehicle Number</TableHead>
                  <TableHead className="font-semibold">Date of Incident</TableHead>
                  <TableHead className="font-semibold">Description</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody >
                {complaints.length > 0 ? (
                  complaints.map((c, i) => (
                    <motion.tr
                      key={c.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="hover:bg-muted/40 transition-colors cursor-pointer"
                      onClick={() => HandleRowClick(c.id)}
                    >
                      <TableCell>{c.transport}</TableCell>
                      <TableCell>{c.issueType}</TableCell>
                      <TableCell>{c.vehicleNo}</TableCell>
                      <TableCell>
                        {new Date(c.dateOfIncident).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {c.description}
                      </TableCell>
                      <TableCell>
                        {/* <Badge className={getStatusColor(c.status)}>
                          {c.status.replace("_", " ").toUpperCase()}
                        </Badge> */}
                        <Badge className="shiny-badge">
                          {c.status.replace("_", " ").toUpperCase()}
                        </Badge>
                      </TableCell>
                    </motion.tr>

                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      No complaints found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
    </motion.div>
  );
}
