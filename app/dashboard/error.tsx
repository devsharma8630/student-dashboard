"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Dashboard Error]", error);
  }, [error]);

  return (
    <main className="flex items-center justify-center min-h-screen p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="max-w-md w-full"
      >
        <article className="card-glass rounded-2xl p-8 text-center space-y-6">
          {/* Icon */}
          <motion.div
            animate={{ rotate: [0, -5, 5, -5, 0] }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center"
          >
            <div className="w-16 h-16 rounded-full bg-accent-rose/10 border border-accent-rose/20 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-[#f43f5e]" />
            </div>
          </motion.div>

          {/* Text */}
          <div className="space-y-2">
            <h1 className="font-display text-xl font-bold text-[#f0f0f0]">
              Something went wrong
            </h1>
            <p className="text-[#8a8a8a] text-sm leading-relaxed">
              Failed to load your dashboard. This could be a Supabase
              connection issue or a missing environment variable.
            </p>
            {error.message && (
              <code className="block mt-3 text-xs text-[#f43f5e] bg-[#f43f5e]/5 border border-[#f43f5e]/10 rounded-lg px-4 py-3 font-mono text-left break-all">
                {error.message}
              </code>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={reset}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-[#f0f0f0] text-sm font-medium transition-opacity hover:opacity-75 active:scale-95"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/20 text-[#00d4ff] text-sm font-medium transition-opacity hover:opacity-75"
            >
              <Home className="w-4 h-4" />
              Dashboard
            </Link>
          </div>

          {/* Digest */}
          {error.digest && (
            <p className="text-xs text-[#555555]">
              Error ID: <span className="font-mono">{error.digest}</span>
            </p>
          )}
        </article>
      </motion.div>
    </main>
  );
}