import type { Metadata } from "next";
import { IBM_Plex_Sans, Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const displayFont = Sora({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "SkillForge.ai",
  description:
    "Analyze free learning resources and forge evidence-based skill paths with research-backed roadmaps, resource comparisons, and measurable outcomes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${bodyFont.variable} ${displayFont.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
