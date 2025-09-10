"use client";

import React, { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subDays, subMonths, isAfter } from "date-fns";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

const ChartDisplay = ({ chartData }) => {
  const [range, setRange] = useState("3m");

  // 🔹 Filter data based on selected range
  const filteredData = useMemo(() => {
    if (!chartData || chartData.length === 0) return [];

    let cutoffDate;
    const now = new Date();

    if (range === "7d") {
      cutoffDate = subDays(now, 7);
    } else if (range === "30d") {
      cutoffDate = subDays(now, 30);
    } else if (range === "3m") {
      cutoffDate = subMonths(now, 3);
    } else {
      return chartData;
    }

    return chartData.filter((item) => {
      const date = new Date(item.day);
      return isAfter(date, cutoffDate);
    });
  }, [chartData, range]);

  // ✅ Human readable range text
  const rangeText =
    range === "7d"
      ? "the last 7 days"
      : range === "30d"
        ? "the last 30 days"
        : "the last 3 months";

  return (
    <div className="w-full shadow-md rounded-xl bg-neutral-900 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-3 gap-3">
        <div>
          <h2 className="text-3xl font-semibold shiny-header">
            Complaints Overview
          </h2>
          <p className="text-sm text-gray-400">
            Showing total complaints for {rangeText}
          </p>
        </div>

        {/* 🔹 Filter dropdown */}
        <Select value={range} onValueChange={(value) => setRange(value)}>
          <SelectTrigger className="w-36 text-sm px-3 py-1 border rounded-md bg-neutral-800 text-white">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 Days</SelectItem>
            <SelectItem value="30d">Last 30 Days</SelectItem>
            <SelectItem value="3m">Last 3 Months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={350}>
        <ChartContainer
          config={{
            resolved: { label: "Resolved", color: "#000000" }, // ✅ legend pointer → black
            inProgress: { label: "In Progress", color: "#f5f5f5" }, // off-white
          }}
          className="aspect-auto h-[300px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              {/* Resolved → Strong Black */}
              <linearGradient id="fillResolved" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#000000" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#000000" stopOpacity={0.15} />
              </linearGradient>

              {/* In Progress → Off White */}
              <linearGradient id="fillInProgress" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f5f5f5" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f5f5f5" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="rgba(255,255,255,0.08)" // faint grid
            />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              stroke="#aaa"
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={{ stroke: "#444", strokeWidth: 1 }}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />
            {/* ✅ Only filled waves */}
            <Area
              dataKey="resolved"
              type="natural"
              fill="url(#fillResolved)"
              stroke="#000000" // legend picks this
              strokeOpacity={0} // invisible line
            />
            <Area
              dataKey="inProgress"
              type="natural"
              fill="url(#fillInProgress)"
              stroke="#f5f5f5" // legend picks this
              strokeOpacity={0} // invisible line
            />
            <ChartLegend
              content={({ payload }) => (
                <div className="flex justify-center mt-4">
                  <ul className="flex gap-6">
                    {payload.map((entry, index) => (
                      <li
                        key={`item-${index}`}
                        className="flex items-center gap-2"
                      >
                        {/* colored dot */}
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-sm text-gray-300">
                          {entry.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            />
          </AreaChart>
        </ChartContainer>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartDisplay;
