import { SkeletonCard, SkeletonHero, SkeletonActivity } from "@/components/ui/Skeletons";

export default function DashboardLoading() {
  return (
    <main className="p-6 space-y-4 max-w-[1400px] mx-auto">
      {/* Hero skeleton */}
      <SkeletonHero />

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton h-24 rounded-xl" />
        ))}
      </div>

      {/* Bento grid */}
      <div className="bento-grid">
        {/* Course cards */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="col-span-12 sm:col-span-6 lg:col-span-3">
            <SkeletonCard />
          </div>
        ))}

        {/* Activity tile */}
        <div className="col-span-12 lg:col-span-8">
          <SkeletonActivity />
        </div>

        {/* Streak tile */}
        <div className="col-span-12 lg:col-span-4">
          <div className="skeleton h-48 rounded-xl" />
        </div>
      </div>
    </main>
  );
}