"use client";

import { motion } from "framer-motion";
import { CourseCard } from "./CourseCard";
import type { Course } from "@/types";

interface CourseGridProps {
  courses: Course[];
  columns?: 2 | 3 | 4;
}

const COLUMN_CLASSES: Record<number, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2",
};

export function CourseGrid({ courses, columns = 2 }: CourseGridProps) {
  const colClass = COLUMN_CLASSES[columns] ?? COLUMN_CLASSES[2];

  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-[#555555] text-sm">No courses found.</p>
        <p className="text-xs text-[#3a3a3a] mt-1">
          Add courses to your Supabase database.
        </p>
      </div>
    );
  }

  return (
    <section aria-label="Enrolled courses">
      <header className="flex items-center justify-between mb-4">
        <h2 className="font-display font-semibold text-[#f0f0f0] text-lg">
          Active Courses
        </h2>
        <span className="text-xs text-[#555555] bg-[#1a1a1a] border border-[#2a2a2a] px-2 py-1 rounded-full">
          {courses.length} enrolled
        </span>
      </header>

      <motion.div
        className={`grid ${colClass} gap-3`}
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.08 } },
          hidden: {},
        }}
      >
        {courses.map((course, i) => (
          <CourseCard key={course.id} course={course} index={i} />
        ))}
      </motion.div>
    </section>
  );
}