"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { BottomNav } from "./BottomNav";
import { cn } from "@/lib/utils";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="dashboard-layout">
      {/* Desktop sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed((c) => !c)}
      />

      {/* Main scrollable area */}
      <div
        className={cn(
          "main-content transition-[margin] duration-300 ease-in-out",
          "ml-0 md:ml-[var(--sidebar-width)]",
          isCollapsed && "md:ml-[var(--sidebar-collapsed)]"
        )}
        style={
          {
            "--sidebar-width": "240px",
            "--sidebar-collapsed": "64px",
          } as React.CSSProperties
        }
      >
        {children}
      </div>

      {/* Mobile bottom navigation */}
      <BottomNav />
    </div>
  );
}