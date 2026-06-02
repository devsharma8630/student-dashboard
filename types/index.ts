// ─── Domain Types ────────────────────────────────────────────────────────────

export interface Course {
  id: string;
  title: string;
  progress: number; // 0-100
  icon_name: string;
  created_at: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: string;
}

export interface ActivityDay {
  date: string;
  count: number; // 0-4 intensity levels
}

export interface Stat {
  label: string;
  value: string | number;
  unit?: string;
  change?: number;    // percentage change, positive or negative
  icon: string;
  color: "cyan" | "purple" | "green" | "amber" | "rose" | "blue";
}

export interface LearningStreak {
  current: number;
  longest: number;
  thisWeek: number;
}

// ─── Component Props ──────────────────────────────────────────────────────────

export interface CourseCardProps {
  course: Course;
  index: number;
}

export interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export interface ProgressBarProps {
  value: number;         // 0-100
  color?: string;
  animated?: boolean;
  showLabel?: boolean;
}

export interface ActivityGridProps {
  data: ActivityDay[];
}

export interface SkeletonProps {
  className?: string;
}

// ─── Supabase Response Types ──────────────────────────────────────────────────

export type SupabaseResponse<T> = {
  data: T | null;
  error: string | null;
};