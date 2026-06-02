"use client";

import { motion } from "framer-motion";
import { WifiOff, Database } from "lucide-react";

interface CourseErrorFallbackProps {
  error: string;
}

export function CourseErrorFallback({ error }: CourseErrorFallbackProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="rounded-xl bg-[#111111] border border-[#f43f5e]/20 p-8 text-center space-y-4"
      role="alert"
      aria-live="polite"
    >
      <div className="flex justify-center">
        <div className="w-12 h-12 rounded-xl bg-[#f43f5e]/10 border border-[#f43f5e]/20 flex items-center justify-center">
          <Database className="w-6 h-6 text-[#f43f5e]" />
        </div>
      </div>

      <div>
        <h3 className="font-display font-semibold text-[#f0f0f0] text-base mb-1">
          Failed to load courses
        </h3>
        <p className="text-[#8a8a8a] text-sm">
          Could not connect to Supabase. Check your environment variables.
        </p>
        <code className="block mt-3 text-xs text-[#f43f5e]/80 bg-[#f43f5e]/5 border border-[#f43f5e]/10 rounded-lg px-4 py-2 font-mono text-left break-all">
          {error}
        </code>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-[#555555]">
        <WifiOff className="w-3 h-3" />
        <span>Supabase connection failed</span>
      </div>
    </motion.div>
  );
}