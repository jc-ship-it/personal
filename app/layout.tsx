import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { DeveloperModeProvider, DeveloperModeBanner } from "@/components/DeveloperMode";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Zhang Jiachang — Interaction Designer",
  description:
    "Personal website for Zhang Jiachang. Portfolio, blog, and professional presence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <DeveloperModeProvider>
            <div className="flex min-h-screen flex-col">
              <Navigation />
              <DeveloperModeBanner />
              <main className="flex-1 pt-11">{children}</main>
              <Footer />
            </div>
            <Analytics />
          </DeveloperModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
