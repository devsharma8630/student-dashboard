import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LearnOS — Student Learning Dashboard",
  description: "A futuristic learning dashboard built with Next.js 15, Supabase, and Framer Motion.",
  keywords: ["learning", "dashboard", "courses", "education", "next.js"],
  authors: [{ name: "LearnOS" }],
  robots: "noindex, nofollow",
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="dark noise">
        {children}
      </body>
    </html>
  );
}