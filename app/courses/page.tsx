import { getCourses } from "@/lib/supabase";
import { CourseGrid } from "@/components/cards/CourseGrid";
import { CourseErrorFallback } from "@/components/ui/CourseErrorFallback";

export const revalidate = 60;

export default async function CoursesPage() {
  const { data: courses, error } = await getCourses();

  return (
    <main className="p-4 md:p-6 max-w-[1400px] mx-auto pb-24 md:pb-6">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold text-[#f0f0f0]">
          My Courses
        </h1>
        <p className="text-[#8a8a8a] mt-1">
          {courses ? `${courses.length} courses enrolled` : "Loading..."}
        </p>
      </header>

      {error ? (
        <CourseErrorFallback error={error} />
      ) : (
        <CourseGrid courses={courses ?? []} columns={3} />
      )}
    </main>
  );
}