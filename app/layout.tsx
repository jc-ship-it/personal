import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { DeveloperModeProvider, DeveloperModeBanner } from "@/components/DeveloperMode";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

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
      <body className={`${outfit.variable} antialiased`}>
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
              <main className="flex-1 pt-16">{children}</main>
              <Footer />
            </div>
          </DeveloperModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
