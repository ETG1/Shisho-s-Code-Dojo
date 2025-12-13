import type { Metadata } from "next";
import { Geist, Geist_Mono,Jersey_10,Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./themeprovider";
import { ClerkProvider } from '@clerk/nextjs'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const GameFont = Jersey_10 ({
  variable: "--font-game",
  subsets: ["latin"],
  weight: "400",
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Code Mastery Dojo",
  description: "A structured coding academy focused on skill mastery — courses, exercises, and clear paths to become a confident developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${GameFont.variable} ${inter.variable} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange>
         {children}
        </ThemeProvider>

      </body>
    </html>
    </ClerkProvider>
  );
}
