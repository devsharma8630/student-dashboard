"use client";

import { motion } from "framer-motion";
import {
  BookOpen, Clock, TrendingUp, Award,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Stat } from "@/types";

const ICON_MAP: Record<string, LucideIcon> = {
  BookOpen, Clock, TrendingUp, Award,
};

const COLOR_MAP: Record<Stat["color"], string> = {
  cyan:   "#00d4ff",
  purple: "#a855f7",
  green:  "#10b981",
  amber:  "#f59e0b",
  rose:   "#f43f5e",
  blue:   "#3b82f6",
};

const GLOW_MAP: Record<Stat["color"], string> = {
  cyan:   "rgba(0,212,255,0.08)",
  purple: "rgba(168,85,247,0.08)",
  green:  "rgba(16,185,129,0.08)",
  amber:  "rgba(245,158,11,0.08)",
  rose:   "rgba(244,63,94,0.08)",
  blue:   "rgba(59,130,246,0.08)",
};

interface StatsRowProps {
  stats: Stat[];
}

export function StatsRow({ stats }: StatsRowProps) {
  return (
    <section
      aria-label="Statistics overview"
      className="grid grid-cols-2 lg:grid-cols-4 gap-3"
    >
      {stats.map((stat, i) => {
        const Icon = ICON_MAP[stat.icon] ?? BookOpen;
        const color = COLOR_MAP[stat.color];
        const glow = GLOW_MAP[stat.color];

        return (
          <motion.article
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              delay: i * 0.07,
            }}
            whileHover={{ scale: 1.02, opacity: 0.95 }}
            className={cn(
              "relative rounded-xl bg-[#111111] border border-[#1f1f1f] p-4",
              "overflow-hidden cursor-default"
            )}
            style={{
              background: `radial-gradient(ellipse at 0% 0%, ${glow} 0%, transparent 60%), #111111`,
            }}
          >
            {/* Icon */}
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
              style={{ background: `${color}15`, border: `1px solid ${color}25` }}
            >
              <Icon className="w-4 h-4" style={{ color }} />
            </div>

            {/* Value */}
            <div className="flex items-baseline gap-1">
              <span className="font-display text-2xl font-bold text-[#f0f0f0]">
                {stat.value}
              </span>
              {stat.unit && (
                <span className="text-sm text-[#8a8a8a]">{stat.unit}</span>
              )}
            </div>

            {/* Label */}
            <p className="text-xs text-[#8a8a8a] mt-0.5">{stat.label}</p>

            {/* Change indicator */}
            {stat.change !== undefined && (
              <div
                className="absolute top-4 right-4 text-xs font-medium px-2 py-0.5 rounded-full"
                style={{
                  color: stat.change >= 0 ? "#10b981" : "#f43f5e",
                  background: stat.change >= 0 ? "#10b98115" : "#f43f5e15",
                }}
              >
                {stat.change >= 0 ? "+" : ""}
                {stat.change}
              </div>
            )}
          </motion.article>
        );
      })}
    </section>
  );
}