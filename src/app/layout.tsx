import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Background from "@/components/background";
import { Providers } from "@/components/providers";
import { cn } from "@/lib/utils";

const siteUrl = "https://swiftui-skills.ameyalambat.com";
const productName = "SwiftUI Skills";
const productDescription =
  "SwiftUI Skills gives AI agents Apple-authored Xcode guidance through a local-first setup so they generate more idiomatic SwiftUI with fewer hallucinated patterns.";
const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION;

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ibm-plex",
});

export const metadata: Metadata = {
  title: "SwiftUI Skills | Apple-authored Xcode guidance for AI agents",
  description: productDescription,
  keywords: [
    "SwiftUI Skills",
    "SwiftUI",
    "AI agents",
    "coding agents",
    "Claude Code",
    "Cursor",
    "Codex",
    "Apple",
    "Xcode",
    "iOS",
    "macOS",
    "visionOS",
    "local-first",
  ],
  authors: [{ name: "Ameya Lambat", url: "https://ameyalambat.com" }],
  creator: "Ameya Lambat",
  publisher: "Ameya Lambat",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  verification: googleSiteVerification
    ? {
        google: googleSiteVerification,
      }
    : undefined,
  icons: {
    icon: [
      {
        url: "/icon.png",
        type: "image/png",
      },
    ],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "SwiftUI Skills",
    description: productDescription,
    url: siteUrl,
    siteName: productName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "SwiftUI Skills",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SwiftUI Skills",
    description: productDescription,
    creator: "@lambatameya",
    images: ["/twitter-image"],
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
      className={cn("dark bg-[#111010] text-white", ibmPlexSans.variable)}
    >
      <body className="font-sans antialiased" suppressHydrationWarning>
        <Background />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
