import type { Metadata } from "next";
import {Outfit} from "next/font/google"
import "./globals.css";
import Navbar from "@/components/NavBar";

export const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
})

export const metadata: Metadata = {
  title: "Gamma",
  description: "Comprehensive movie streaming platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} font-sans`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
