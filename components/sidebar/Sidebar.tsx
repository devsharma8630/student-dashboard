"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Settings2,
  ChevronLeft,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/mock-data";
import type { SidebarProps } from "@/types";

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Settings2,
};

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={false}
      animate={{ width: isCollapsed ? 64 : 240 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "fixed left-0 top-0 h-dvh z-40",
        "hidden md:flex flex-col",
        "bg-[#0a0a0a] border-r border-[#1a1a1a]",
        "overflow-hidden"
      )}
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-[#1a1a1a] shrink-0 h-16">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#a855f7] flex items-center justify-center shrink-0">
          <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
        </div>
        <AnimatePresence>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className="font-display font-bold text-lg text-[#f0f0f0] whitespace-nowrap"
            >
              LearnOS
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col gap-1 p-2 flex-1">
        {NAV_ITEMS.map((item) => {
          const Icon = ICON_MAP[item.icon] ?? LayoutDashboard;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "relative flex items-center gap-3 px-3 py-2.5 rounded-xl",
                "text-sm font-medium transition-opacity",
                "hover:opacity-80",
                isActive
                  ? "text-[#f0f0f0]"
                  : "text-[#8a8a8a] hover:text-[#f0f0f0]"
              )}
              title={isCollapsed ? item.label : undefined}
            >
              {/* Active pill indicator */}
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              {/* Active glow dot */}
              {isActive && (
                <motion.div
                  layoutId="sidebar-glow"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-[#00d4ff]"
                  style={{ boxShadow: "0 0 8px #00d4ff" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              <Icon
                className={cn(
                  "w-4 h-4 shrink-0 relative z-10",
                  isActive ? "text-[#00d4ff]" : "text-current"
                )}
              />

              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.15 }}
                    className="relative z-10 whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* User avatar area */}
      <div className="p-3 border-t border-[#1a1a1a] shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#a855f7] to-[#00d4ff] shrink-0 flex items-center justify-center text-xs font-bold text-white">
            A
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-medium text-[#f0f0f0] truncate">
                  Dev Pandit
                </p>
                <p className="text-xs text-[#555555] truncate">
                  Pro Student
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className={cn(
          "absolute -right-3 top-[72px]",
          "w-6 h-6 rounded-full",
          "bg-[#1a1a1a] border border-[#2a2a2a]",
          "flex items-center justify-center",
          "transition-opacity hover:opacity-80",
          "text-[#8a8a8a]"
        )}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <motion.div
          animate={{ rotate: isCollapsed ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChevronLeft className="w-3 h-3" />
        </motion.div>
      </button>
    </motion.nav>
  );
}