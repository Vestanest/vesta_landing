import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import ClientWrapper from "../components/ClientWrapper";

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vesta Nest - Find Your Dream Home in Ghana",
  description:
    "Discover exceptional properties across Ghana with our innovative platform. Experience modern living with elegance, comfort, and style.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${urbanist.variable} font-sans antialiased`}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
