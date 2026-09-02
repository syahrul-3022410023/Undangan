import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Great_Vibes, Caveat, Sacramento } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/SmoothScrolling";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  weight: ["400"],
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  weight: ["400"],
  subsets: ["latin"],
});

const sacramento = Sacramento({
  variable: "--font-sacramento",
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Boarding Pass - Our Wedding",
  description: "A beautiful boarding pass themed wedding invitation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${greatVibes.variable} ${caveat.variable} ${sacramento.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-gray-800 bg-[#0D241A]">
        <SmoothScrolling>
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
