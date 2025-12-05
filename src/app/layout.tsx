import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import ClientWrapper from "../components/ClientWrapper";
import { AuthProvider } from "../contexts/AuthContext";
import { SearchProvider } from "../contexts/SearchContext";
import { ToastProvider } from "../contexts/ToastContext";
import { generateMetadata as generateSEOMetadata, generateOrganizationStructuredData } from "../lib/seo";
import PerformanceMonitor from "../components/PerformanceMonitor";
import GoogleAnalytics from "../components/GoogleAnalytics";

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  display: "swap",
});

export const metadata: Metadata = generateSEOMetadata({
  title: "Premium Real Estate in Ghana | VestaNest",
  description: "Find your dream home in Ghana with VestaNest. Browse luxury apartments, houses, and properties in Accra, Kumasi, and other major cities. Expert real estate services.",
  keywords: [
    "luxury real estate Ghana",
    "premium properties Ghana", 
    "real estate services Ghana",
    "property investment Ghana",
    "real estate agent Ghana"
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationStructuredData()),
          }}
        />
      </head>
      <body className={`${urbanist.variable} font-sans antialiased`}>
        <ToastProvider>
          <AuthProvider>
            <SearchProvider>
              <ClientWrapper>{children}</ClientWrapper>
            </SearchProvider>
          </AuthProvider>
        </ToastProvider>
        
        {/* Performance Monitoring */}
        <PerformanceMonitor />
        
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
