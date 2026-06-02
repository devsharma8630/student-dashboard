"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Settings2,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/mock-data";

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Settings2,
};

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      aria-label="Mobile navigation"
    >
      {/* Frosted glass bar */}
      <div className="bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-[#1a1a1a] px-2 pb-safe">
        <ul className="flex items-center justify-around h-16">
          {NAV_ITEMS.map((item) => {
            const Icon = ICON_MAP[item.icon] ?? LayoutDashboard;
            const isActive = pathname.startsWith(item.href);

            return (
              <li key={item.id} className="flex-1">
                <Link
                  href={item.href}
                  className="flex flex-col items-center gap-1 py-2 transition-opacity hover:opacity-80"
                  aria-current={isActive ? "page" : undefined}
                >
                  <div className="relative">
                    {isActive && (
                      <motion.div
                        layoutId="bottom-nav-active"
                        className="absolute inset-0 -m-1.5 rounded-xl bg-[#00d4ff]/10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <Icon
                      className={cn(
                        "w-5 h-5 relative z-10",
                        isActive ? "text-[#00d4ff]" : "text-[#555555]"
                      )}
                    />
                  </div>
                  <span
                    className={cn(
                      "text-[10px] font-medium",
                      isActive ? "text-[#00d4ff]" : "text-[#555555]"
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}