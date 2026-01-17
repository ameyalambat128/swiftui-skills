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
  title: "/swiftui-skills",
  description:
    "Apple-authored SwiftUI and Apple platform guidance, packaged as skills for AI coding agents.",
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
