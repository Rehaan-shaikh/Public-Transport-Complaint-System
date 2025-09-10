"use client";

import React, { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronsLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ComplaintTable = ({
  complaints,
  page,
  totalPages,
  totalCount,
  limit,
}) => {
  const router = useRouter();

  // local filters/search (client-side only)
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterTransport, setFilterTransport] = useState("All");
  const [filterIssueType, setFilterIssueType] = useState("All");

  function goToPage(newPage, newLimit = limit) {
    router.push(`/admin?page=${newPage}&limit=${newLimit}`);
  }

  // filter/search applied client-side on current page results only
  const filteredComplaints = useMemo(() => {
    let result = [...complaints];
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        (t) =>
          t.description?.toLowerCase().includes(searchLower) ||
          t.transport?.toLowerCase().includes(searchLower) ||
          t.location?.toLowerCase().includes(searchLower) ||
          t.vehicleNo?.toLowerCase().includes(searchLower) ||
          t.contactName?.toLowerCase().includes(searchLower) ||
          t.contactEmail?.toLowerCase().includes(searchLower)
      );
    }
    if (filterStatus !== "All") {
      result = result.filter((t) => t.status === filterStatus);
    }
    if (filterTransport !== "All") {
      result = result.filter((t) => t.transport === filterTransport);
    }
    if (filterIssueType !== "All") {
      result = result.filter((t) => t.issueType === filterIssueType);
    }
    return result;
  }, [complaints, searchTerm, filterStatus, filterTransport, filterIssueType]);

  function HandleRowClick(id) {
    router.push(`/admin/complaint/${id}`);
  }

  return (
    <div className="w-full">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-center shiny-header">
        Complaints List
      </h1>

      {/* Filters */}
      <div className="bg-muted/30 p-4 rounded-xl mb-6 max-w-5xl mx-auto">
        <div className="flex flex-wrap gap-4 justify-center">
          <Input
            placeholder="Search complaints..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />

          {/* Status filter */}
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>

          {/* Transport filter */}
          <Select value={filterTransport} onValueChange={setFilterTransport}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Transport" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Modes</SelectItem>
              <SelectItem value="Bus">Bus</SelectItem>
              <SelectItem value="Train">Train</SelectItem>
              <SelectItem value="Metro">Metro</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>

          {/* Issue Type filter */}
          <Select value={filterIssueType} onValueChange={setFilterIssueType}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by Issue Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Issues</SelectItem>
              <SelectItem value="busdelay">Bus Delay</SelectItem>
              <SelectItem value="Overcrowding">Overcrowding</SelectItem>
              <SelectItem value="RudeStaff">Rude Staff</SelectItem>
              <SelectItem value="UncleanVehicle">Unclean Vehicle</SelectItem>
              <SelectItem value="FaultyAC">Faulty AC</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableCaption>A list of submitted complaints.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">Status</TableHead>
            <TableHead className="font-bold">Mode</TableHead>
            <TableHead className="font-bold">Issue Type</TableHead>
            <TableHead className="font-bold">Vehicle No</TableHead>
            <TableHead className="font-bold">Location</TableHead>
            <TableHead className="font-bold">Date of Incident</TableHead>
            <TableHead className="font-bold">Submitted By</TableHead>
            <TableHead className="font-bold">Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredComplaints?.length > 0 ? (
            filteredComplaints.map((c) => (
              <motion.tr
                key={c.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="hover:bg-muted/25 transition-colors cursor-pointer"
                onClick={() => HandleRowClick(c.id)}
              >
                <TableCell><Badge className="shiny-badge">{c.status.replace("_", " ")}</Badge></TableCell>
                <TableCell>{c.transport}</TableCell>
                <TableCell>{c.issueType}</TableCell>
                <TableCell>{c.vehicleNo}</TableCell>
                <TableCell>{c.location}</TableCell>
                <TableCell>
                  {new Date(c.dateOfIncident).toLocaleDateString()}
                </TableCell>
                <TableCell>{c.contactName}</TableCell>
                <TableCell>{c.contactEmail}</TableCell>
              </motion.tr>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={8}
                className="text-center text-muted-foreground"
              >
                No complaints found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
        <div className="flex flex-col text-[#8a8a8a]">
          <div>
            Showing {(page - 1) * limit + 1}–
            {Math.min(page * limit, totalCount)} of {totalCount}
          </div>

          <div className="px-2 self-center">
            Page {page} of {totalPages || 1}
          </div>
        </div>
 
        {/* Buttons */}
        <div className="flex gap-1">
          
        {/* Rows per page */}
        <Select 
          value={limit.toString()}
          onValueChange={(val) => goToPage(1, Number(val))}
        >
          <SelectTrigger className="w-[100px] ">
            <SelectValue placeholder="Rows per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
          <Button
            className="shiny-btn"
            onClick={() => goToPage(1)}
            disabled={page === 1}
          >
            <ChevronsLeft />
          </Button>
          <Button
            className="shiny-btn"
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
          >
            <ChevronLeft />
          </Button>
          <Button
            className="shiny-btn"
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
          >
            <ChevronRight />
          </Button>
          <Button
            className="shiny-btn"
            onClick={() => goToPage(totalPages)}
            disabled={page === totalPages}
          >
            <ChevronLeft />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintTable;
