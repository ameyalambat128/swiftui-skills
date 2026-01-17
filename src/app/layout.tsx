import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Background from "@/components/background";
import { cn } from "@/lib/utils";

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ibm-plex",
});

export const metadata: Metadata = {
  title: "/swiftui-skills - Agent Skills for SwiftUI",
  description:
    "Agent skills for SwiftUI, built from Apple's Xcode AI documentation. Local install. No telemetry.",
  keywords: [
    "SwiftUI",
    "AI",
    "coding agent",
    "Claude Code",
    "Cursor",
    "Apple",
    "Xcode",
    "iOS",
    "macOS",
    "visionOS",
  ],
  authors: [{ name: "Ameya Lambat", url: "https://ameyalambat.com" }],
  creator: "Ameya Lambat",
  metadataBase: new URL("https://swiftui-skills.ameyalambat.com"),
  openGraph: {
    title: "/swiftui-skills - Agent Skills for SwiftUI",
    description:
      "Agent skills for SwiftUI, built from Apple's Xcode AI documentation.",
    url: "https://swiftui-skills.ameyalambat.com",
    siteName: "/swiftui-skills",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "/swiftui-skills - Agent Skills for SwiftUI",
    description:
      "Agent skills for SwiftUI, built from Apple's Xcode AI documentation.",
    creator: "@lambatameya",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <html
      lang="en"
      className={cn(
        "bg-white text-black dark:bg-[#111010] dark:text-white",
        ibmPlexSans.variable
      )}
    >
      <body className="font-sans antialiased">
        <Background />
        {children}
      </body>
    </html>
  );
}
