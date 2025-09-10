import React from "react";
import Chart from "./_components/Chart";
import { getAllComplaintsByPagination } from "@/Actions/Complaint";
import ComplaintTable from "./_components/Table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboard = async ({searchParams}) => {
  const page = Number(searchParams.page) || 1
  const limit = Number(searchParams.limit) || 10

  const { complaints, totalPages, totalCount } = await getAllComplaintsByPagination(page, limit)
  return (
    <div className="space-y-8 bg-black min-h-screen p-6">
            {/* Dashboard Title */}
      <h1 className="text-5xl text-center font-bold shiny-header">
        Admin Dashboard
      </h1>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Chart Card */}
        <Card className="bg-background shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className=" text-2xl font-semibold">
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Chart />
          </CardContent>
        </Card>

        {/* Table Card */}
        <Card className="bg-background shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className=" text-2xl font-semibold">
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ComplaintTable
          complaints={complaints}
          page={page}
          totalPages={totalPages}
          totalCount={totalCount}
          limit={limit}
        />

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
