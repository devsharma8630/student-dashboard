import { Suspense } from "react";
import { getCourses } from "@/lib/supabase";
import { generateActivityData, calculateStreak } from "@/lib/utils";
import { STATS } from "@/lib/mock-data";
import { HeroTile } from "@/components/cards/HeroTile";
import { StatsRow } from "@/components/cards/StatsRow";
import { CourseGrid } from "@/components/cards/CourseGrid";
import { ActivityTile } from "@/components/cards/ActivityTile";
import { StreakTile } from "@/components/cards/StreakTile";
import { SkeletonCard } from "@/components/ui/Skeletons";
import { CourseErrorFallback } from "@/components/ui/CourseErrorFallback";

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function DashboardPage() {
  // Fetch courses server-side — no waterfall
  const [coursesResult, activityData] = await Promise.all([
    getCourses(),
    Promise.resolve(generateActivityData()),
  ]);

  const streak = calculateStreak(activityData);

  return (
    <main className="p-4 md:p-6 space-y-4 max-w-[1400px] mx-auto pb-24 md:pb-6">
      {/* Hero tile — full width */}
      <HeroTile streak={streak} />

      {/* Stats row */}
      <StatsRow stats={STATS} />

      {/* Bento grid */}
      <section className="bento-grid" aria-label="Learning overview">
        {/* Course cards — 8 cols on desktop */}
        <div className="col-span-12 lg:col-span-8">
          <Suspense
            fallback={
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            }
          >
            {coursesResult.error ? (
              <CourseErrorFallback error={coursesResult.error} />
            ) : (
              <CourseGrid courses={coursesResult.data ?? []} />
            )}
          </Suspense>
        </div>

        {/* Streak tile — 4 cols on desktop */}
        <aside className="col-span-12 lg:col-span-4">
          <StreakTile streak={streak} />
        </aside>

        {/* Activity tile — full width */}
        <section
          className="col-span-12"
          aria-label="Learning activity"
        >
          <ActivityTile data={activityData} />
        </section>
      </section>
    </main>
  );
}