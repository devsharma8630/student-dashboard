import type { NavItem, Stat } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { id: "courses",   label: "Courses",   href: "/courses",   icon: "BookOpen" },
  { id: "analytics", label: "Analytics", href: "/analytics", icon: "BarChart3" },
  { id: "settings",  label: "Settings",  href: "/settings",  icon: "Settings2" },
];

export const STATS: Stat[] = [
  {
    label: "Courses Active",
    value: 4,
    icon: "BookOpen",
    color: "cyan",
    change: 2,
  },
  {
    label: "Hours This Week",
    value: "12.4",
    unit: "hrs",
    icon: "Clock",
    color: "purple",
    change: 18,
  },
  {
    label: "Avg. Progress",
    value: "67.5",
    unit: "%",
    icon: "TrendingUp",
    color: "green",
    change: 5,
  },
  {
    label: "Certificates",
    value: 3,
    icon: "Award",
    color: "amber",
    change: 1,
  },
];