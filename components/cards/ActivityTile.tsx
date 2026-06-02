"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ActivityGridProps, ActivityDay } from "@/types";

const INTENSITY_COLORS: Record<number, string> = {
  0: "#161616",
  1: "#10b98130",
  2: "#10b98160",
  3: "#10b98190",
  4: "#10b981",
};

const INTENSITY_LABELS: Record<number, string> = {
  0: "No activity",
  1: "Light",
  2: "Moderate",
  3: "Active",
  4: "Very active",
};

const WEEKDAY_LABELS = ["Mon", "", "Wed", "", "Fri", "", "Sun"];
const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function ActivityTile({ data }: ActivityGridProps) {
  // Group into 52 columns of 7 days
  const weeks: ActivityDay[][] = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  // Generate month labels positioned at correct week
  const monthPositions: { month: string; col: number }[] = [];
  weeks.forEach((week, col) => {
    const firstDay = week[0];
    if (firstDay) {
      const date = new Date(firstDay.date);
      if (date.getDate() <= 7) {
        monthPositions.push({
          month: MONTH_LABELS[date.getMonth()],
          col,
        });
      }
    }
  });

  const totalActive = data.filter((d) => d.count > 0).length;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.3 }}
      className="rounded-xl bg-[#111111] border border-[#1f1f1f] p-5 overflow-hidden"
    >
      {/* Header */}
      <header className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#10b981]" />
          <h2 className="font-display font-semibold text-[#f0f0f0] text-sm">
            Learning Activity
          </h2>
        </div>
        <span className="text-xs text-[#555555]">
          {totalActive} active days this year
        </span>
      </header>

      {/* Grid container — horizontally scrollable on mobile */}
      <div className="overflow-x-auto">
        <div className="min-w-[640px]">
          {/* Month labels */}
          <div className="flex mb-2 pl-8">
            {weeks.map((_, col) => {
              const pos = monthPositions.find((p) => p.col === col);
              return (
                <div key={col} className="w-[12px] mr-[2px] shrink-0">
                  {pos && (
                    <span className="text-[9px] text-[#555555] whitespace-nowrap">
                      {pos.month}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex gap-0">
            {/* Weekday labels */}
            <div className="flex flex-col gap-[2px] mr-2 shrink-0">
              {WEEKDAY_LABELS.map((label, i) => (
                <div key={i} className="h-[12px] flex items-center">
                  <span className="text-[9px] text-[#555555] w-6 text-right">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Activity cells */}
            {weeks.map((week, weekIdx) => (
              <div key={weekIdx} className="flex flex-col gap-[2px] mr-[2px]">
                {week.map((day, dayIdx) => (
                  <motion.div
                    key={day.date}
                    className="activity-cell w-[12px] h-[12px] rounded-[2px] group/cell relative"
                    style={{ background: INTENSITY_COLORS[day.count] }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: (weekIdx * 7 + dayIdx) * 0.001 + 0.1,
                      type: "spring",
                      stiffness: 400,
                      damping: 20,
                    }}
                    title={`${day.date}: ${INTENSITY_LABELS[day.count]}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <footer className="flex items-center gap-2 mt-4 justify-end">
        <span className="text-[10px] text-[#555555]">Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className="w-[10px] h-[10px] rounded-[2px]"
            style={{ background: INTENSITY_COLORS[level] }}
          />
        ))}
        <span className="text-[10px] text-[#555555]">More</span>
      </footer>
    </motion.article>
  );
}