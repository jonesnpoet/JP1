import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteIntroProvider from "@/components/site-intro/SiteIntroProvider";
import ProjectTransitionProvider from "@/components/project-transition/ProjectTransitionProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jones + Poet — Interior Design",
  description: "Jones + Poet is an interior design studio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ProjectTransitionProvider>
          <SiteIntroProvider>{children}</SiteIntroProvider>
        </ProjectTransitionProvider>
      </body>
    </html>
  );
}
