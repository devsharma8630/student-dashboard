"use client";

import { motion } from "framer-motion";
import { Flame, Target, Zap } from "lucide-react";
import type { LearningStreak } from "@/types";

interface StreakTileProps {
  streak: LearningStreak;
}

export function StreakTile({ streak }: StreakTileProps) {
  const weekPercent = Math.round((streak.thisWeek / 7) * 100);
  const circumference = 2 * Math.PI * 40;
  const dashOffset = circumference - (weekPercent / 100) * circumference;

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
      className="rounded-xl bg-[#111111] border border-[#1f1f1f] p-5 h-full flex flex-col gap-5"
      aria-label="Learning streak"
    >
      <header className="flex items-center gap-2">
        <Flame className="w-4 h-4 text-[#f59e0b]" />
        <h2 className="font-display font-semibold text-[#f0f0f0] text-sm">
          Your Streak
        </h2>
      </header>

      {/* Radial weekly progress */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
            {/* Track */}
            <circle
              cx="48"
              cy="48"
              r="40"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="6"
            />
            {/* Progress */}
            <motion.circle
              cx="48"
              cy="48"
              r="40"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: dashOffset }}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
              style={{ filter: "drop-shadow(0 0 6px rgba(245, 158, 11, 0.4))" }}
            />
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display font-bold text-xl text-[#f0f0f0]">
              {streak.thisWeek}/7
            </span>
            <span className="text-[10px] text-[#555555]">this week</span>
          </div>
        </div>

        <p className="text-xs text-[#8a8a8a] text-center">
          {weekPercent}% of your weekly goal
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-[#1a1a1a] border border-[#222] p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Zap className="w-3 h-3 text-[#00d4ff]" />
          </div>
          <span className="font-display font-bold text-lg text-[#f0f0f0]">
            {streak.current}
          </span>
          <p className="text-[10px] text-[#555555]">Current</p>
        </div>
        <div className="rounded-lg bg-[#1a1a1a] border border-[#222] p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Target className="w-3 h-3 text-[#a855f7]" />
          </div>
          <span className="font-display font-bold text-lg text-[#f0f0f0]">
            {streak.longest}
          </span>
          <p className="text-[10px] text-[#555555]">Best</p>
        </div>
      </div>

      {/* Week dots */}
      <div className="flex justify-between px-1">
        {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <motion.div
              className="w-7 h-7 rounded-full border flex items-center justify-center text-xs font-medium"
              style={{
                background: i < streak.thisWeek ? "#f59e0b15" : "#1a1a1a",
                borderColor: i < streak.thisWeek ? "#f59e0b40" : "#222",
                color: i < streak.thisWeek ? "#f59e0b" : "#555",
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: i * 0.05 + 0.5,
                type: "spring",
                stiffness: 400,
                damping: 20,
              }}
            >
              {i < streak.thisWeek ? "✓" : day}
            </motion.div>
          </div>
        ))}
      </div>
    </motion.aside>
  );
}