import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AdminProvider } from "../context/AdminContext";
import LoginModal from "./components/LoginModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vividhata - Chamber of Vividhata",
  description: "Official website of Vividhata - Chamber of Vividhata",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <AdminProvider>
          {children}
          <LoginModal />
        </AdminProvider>
      </body>
    </html>
  );
}
