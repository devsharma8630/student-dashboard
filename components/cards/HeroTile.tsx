"use client";

import { motion } from "framer-motion";
import { Flame, Sun } from "lucide-react";
import type { LearningStreak } from "@/types";

interface HeroTileProps {
  streak: LearningStreak;
}

export function HeroTile({ streak }: HeroTileProps) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative overflow-hidden rounded-2xl bg-[#0f0f0f] border border-[#1f1f1f] p-6 md:p-8"
      aria-label="Welcome hero"
    >
      {/* Background gradient mesh */}
      <div className="absolute inset-0 bg-mesh-cyan opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-mesh-purple opacity-40 pointer-events-none" />

      {/* Subtle dot grid */}
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2">
          {/* Greeting badge */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] text-xs text-[#8a8a8a]"
          >
            <Sun className="w-3 h-3 text-[#f59e0b]" />
            {greeting}
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 20 }}
            className="font-display text-3xl md:text-4xl font-bold text-[#f0f0f0]"
          >
            Welcome back,{" "}
            <span className="gradient-text-cyan">Dev</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[#8a8a8a] text-sm md:text-base max-w-md"
          >
            You&apos;re on a roll! Keep the momentum going — you&apos;re{" "}
            <span className="text-[#10b981] font-medium">
              {100 - Math.round((streak.current / 30) * 100)}% closer
            </span>{" "}
            to your monthly goal.
          </motion.p>
        </div>

        {/* Streak indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, type: "spring", stiffness: 300, damping: 20 }}
          className="flex gap-4 shrink-0"
        >
          <StreakBadge
            label="Day Streak"
            value={streak.current}
            icon={<Flame className="w-5 h-5 text-[#f59e0b]" />}
            color="#f59e0b"
          />
          <StreakBadge
            label="Best Streak"
            value={streak.longest}
            icon={<Flame className="w-5 h-5 text-[#f43f5e]" />}
            color="#f43f5e"
          />
          <StreakBadge
            label="This Week"
            value={`${streak.thisWeek}/7`}
            icon={<Flame className="w-5 h-5 text-[#a855f7]" />}
            color="#a855f7"
          />
        </motion.div>
      </div>

      {/* Bottom scan line animation */}
      <motion.div
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00d4ff]/30 to-transparent pointer-events-none"
      />
    </motion.article>
  );
}

function StreakBadge({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div
      className="flex flex-col items-center gap-2 px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] min-w-[72px]"
      style={{ boxShadow: `0 0 20px ${color}10` }}
    >
      {icon}
      <span className="font-display font-bold text-xl text-[#f0f0f0]">
        {value}
      </span>
      <span className="text-[10px] text-[#555555] text-center leading-tight">
        {label}
      </span>
    </div>
  );
}