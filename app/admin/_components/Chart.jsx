import React from "react";
import { format as formatDate } from "date-fns";
import { getComplaintTimestamps } from "@/Actions/Complaint";
import ChartDisplay from "./ChartDisplay";

// Transform complaints into daily status counts
function getDailyStatusCounts(complaints) {
  const counts = {};

  complaints.forEach((complaint) => {
    const { statusTimestamps } = complaint;  //statusTimestamps is an object containing inProgressAt and resolvedAt

    if (statusTimestamps.inProgressAt) {  //updating the count of inprogress complaints for a perticular day
      const day = formatDate(new Date(statusTimestamps.inProgressAt), "yyyy-MM-dd");
      counts[day] = counts[day] || { day, inProgress: 0, resolved: 0 };
      counts[day].inProgress += 1;
    }

    if (statusTimestamps.resolvedAt) {
      const day = formatDate(new Date(statusTimestamps.resolvedAt), "yyyy-MM-dd");
      counts[day] = counts[day] || { day, inProgress: 0, resolved: 0 };
      counts[day].resolved += 1;
    }
  });

  return Object.values(counts).sort(
    (a, b) => new Date(a.day).getTime() - new Date(b.day).getTime()
  );
}

export default async function Chart() {
  let chartData = [];

  try {
    const response = await getComplaintTimestamps();
    if (response.success && response.data) {
      // console.log("Raw complaint timestamps:", response.data);
      chartData = getDailyStatusCounts(response.data);
      // console.log("Transformed chart data:", chartData);
    }
  } catch (err) {
    console.error("Error fetching chart data:", err);
  }

  if (!chartData.length) {
    return <div>No chart data available</div>;
  }

  return (
    <div>
      <ChartDisplay chartData={chartData} />
    </div>
  );
}
