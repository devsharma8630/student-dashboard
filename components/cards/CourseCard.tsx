"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import * as LucideIcons from "lucide-react";
import { BookOpen } from "lucide-react";
import { getProgressColor, getProgressLabel, cn } from "@/lib/utils";
import type { CourseCardProps } from "@/types";

// Dynamically resolve icon from icon_name string
function getIcon(name: string) {
  const icons = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
  return icons[name] ?? BookOpen;
}

const MESH_GRADIENTS = [
  "radial-gradient(ellipse at 0% 0%, rgba(0,212,255,0.08) 0%, transparent 70%)",
  "radial-gradient(ellipse at 100% 0%, rgba(168,85,247,0.08) 0%, transparent 70%)",
  "radial-gradient(ellipse at 0% 100%, rgba(16,185,129,0.08) 0%, transparent 70%)",
  "radial-gradient(ellipse at 100% 100%, rgba(245,158,11,0.08) 0%, transparent 70%)",
];

export function CourseCard({ course, index }: CourseCardProps) {
  const Icon = getIcon(course.icon_name);
  const progressColor = getProgressColor(course.progress);
  const progressLabel = getProgressLabel(course.progress);
  const meshGradient = MESH_GRADIENTS[index % MESH_GRADIENTS.length];

  // Animated counter for progress value
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    const controls = animate(count, course.progress, {
      duration: 1.2,
      delay: index * 0.1 + 0.3,
      ease: "easeOut",
    });
    return controls.stop;
  }, [count, course.progress, index]);

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.97 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        },
      }}
      whileHover={{
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="group relative rounded-xl bg-[#111111] border border-[#1f1f1f] p-5 cursor-pointer overflow-hidden"
      style={{
        background: `${meshGradient}, #111111`,
        boxShadow: "0 1px 3px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.03)",
      }}
      aria-label={`${course.title} — ${course.progress}% complete`}
    >
      {/* Hover border glow */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          border: `1px solid ${progressColor}30`,
          boxShadow: `0 0 20px ${progressColor}10, inset 0 0 20px ${progressColor}05`,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Scanline overlay */}
      <div className="scanlines absolute inset-0 rounded-xl pointer-events-none opacity-50" />

      {/* Header */}
      <header className="flex items-start justify-between gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: `${progressColor}15`,
            border: `1px solid ${progressColor}25`,
          }}
        >
          <span style={{ color: progressColor }}>
  <Icon className="w-5 h-5" />
</span>
        </div>

        {/* Progress percentage counter */}
        <div className="text-right">
          <motion.span
            className="font-display font-bold text-lg leading-none"
            style={{ color: progressColor }}
          >
            {rounded}
          </motion.span>
          <span className="text-xs text-[#555555]">%</span>
        </div>
      </header>

      {/* Title */}
      <h3 className="font-medium text-[#f0f0f0] text-sm leading-tight mb-1">
        {course.title}
      </h3>
      <p className="text-xs text-[#555555] mb-4">{progressLabel}</p>

      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: progressColor }}
            initial={{ width: "0%" }}
            animate={{ width: `${course.progress}%` }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 15,
              delay: index * 0.1 + 0.4,
            }}
          />
        </div>
      </div>
    </motion.article>
  );
}