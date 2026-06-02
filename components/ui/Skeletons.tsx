"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { SkeletonProps } from "@/types";

// ─── Base Skeleton ────────────────────────────────────────────────────────────

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn("skeleton rounded-lg", className)}
      aria-hidden="true"
    />
  );
}

// ─── Hero Skeleton ────────────────────────────────────────────────────────────

export function SkeletonHero() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-2xl bg-[#0f0f0f] border border-[#1f1f1f] p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
      aria-busy="true"
      aria-label="Loading hero section"
    >
      <div className="space-y-3 flex-1">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-4 w-80" />
      </div>
      <div className="flex gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-20 rounded-xl" />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Course Card Skeleton ─────────────────────────────────────────────────────

export function SkeletonCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl bg-[#111111] border border-[#1f1f1f] p-5 space-y-4"
      aria-busy="true"
    >
      <div className="flex items-start justify-between">
        <Skeleton className="h-10 w-10 rounded-xl" />
        <Skeleton className="h-6 w-12" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <Skeleton className="h-1.5 w-full rounded-full" />
    </motion.div>
  );
}

// ─── Activity Grid Skeleton ───────────────────────────────────────────────────

export function SkeletonActivity() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-xl bg-[#111111] border border-[#1f1f1f] p-5"
      aria-busy="true"
    >
      <div className="flex items-center justify-between mb-5">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-4 w-40" />
      </div>
      {/* Fake contribution grid */}
      <div className="flex gap-[2px] overflow-hidden">
        {Array.from({ length: 52 }).map((_, col) => (
          <div key={col} className="flex flex-col gap-[2px]">
            {Array.from({ length: 7 }).map((_, row) => (
              <div
                key={row}
                className="w-[12px] h-[12px] rounded-[2px] bg-[#161616]"
              />
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
}