import { createClient } from "@supabase/supabase-js";
import { createBrowserClient, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Course, SupabaseResponse } from "@/types";

// ─── Environment Validation ───────────────────────────────────────────────────

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Check your .env.local file."
  );
}

// ─── Browser Client (Client Components) ──────────────────────────────────────

export function createSupabaseBrowserClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

// ─── Server Client (Server Components) ───────────────────────────────────────

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Server Component — cookies are read-only; ignore write errors
        }
      },
    },
  });
}

// ─── Static (non-auth) admin client for simple public reads ──────────────────

export const supabaseAdmin = createClient(supabaseUrl, supabaseAnonKey);

// ─── Data Fetching Functions ──────────────────────────────────────────────────

/**
 * Fetch all courses from Supabase, ordered by creation date.
 * Called from Server Components only.
 */
export async function getCourses(): Promise<SupabaseResponse<Course[]>> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("[Supabase] getCourses error:", error.message);
      return { data: null, error: error.message };
    }

    return { data: data as Course[], error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { data: null, error: message };
  }
}

/**
 * Fetch a single course by ID.
 */
export async function getCourseById(
  id: string
): Promise<SupabaseResponse<Course>> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data as Course, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { data: null, error: message };
  }
}