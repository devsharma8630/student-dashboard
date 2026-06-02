import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ActivityDay } from "@/types";

// ─── Class Name Helper ────────────────────────────────────────────────────────

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Activity Data Generator ──────────────────────────────────────────────────

/**
 * Generates a mock 52-week (364-day) GitHub-style contribution grid.
 * In production, replace with real Supabase query.
 */
export function generateActivityData(): ActivityDay[] {
  const days: ActivityDay[] = [];
  const today = new Date();

  for (let i = 363; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    // Weighted random so recent days are more active
    const recencyWeight = 1 - i / 363;
    const rand = Math.random();
    let count = 0;

    if (rand < 0.25 - recencyWeight * 0.1) count = 0;
    else if (rand < 0.5) count = 1;
    else if (rand < 0.75) count = 2;
    else if (rand < 0.9) count = 3;
    else count = 4;

    days.push({
      date: date.toISOString().split("T")[0],
      count,
    });
  }

  return days;
}

// ─── Format Helpers ───────────────────────────────────────────────────────────

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getProgressColor(progress: number): string {
  if (progress >= 80) return "#10b981"; // green
  if (progress >= 50) return "#00d4ff"; // cyan
  if (progress >= 25) return "#f59e0b"; // amber
  return "#f43f5e";                      // rose
}

export function getProgressLabel(progress: number): string {
  if (progress >= 90) return "Almost done!";
  if (progress >= 70) return "Great progress";
  if (progress >= 50) return "Halfway there";
  if (progress >= 25) return "Just started";
  return "Not started";
}

// ─── Streak Calculation ───────────────────────────────────────────────────────

export function calculateStreak(data: ActivityDay[]): {
  current: number;
  longest: number;
  thisWeek: number;
} {
  let current = 0;
  let longest = 0;
  let streak = 0;

  // Count from most recent
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].count > 0) {
      streak++;
      if (i === data.length - 1 || data[i + 1].count > 0) {
        current = streak;
      }
      longest = Math.max(longest, streak);
    } else {
      if (current === 0) break;
      streak = 0;
    }
  }

  const thisWeek = data
    .slice(-7)
    .filter((d) => d.count > 0).length;

  return { current, longest, thisWeek };
}