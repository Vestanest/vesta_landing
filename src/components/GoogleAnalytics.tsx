"use client";
import Script from "next/script";

interface GoogleAnalyticsProps {
  measurementId: string;
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_title: document.title,
              page_location: window.location.href,
              send_page_view: true
            });
          `,
        }}
      />
    </>
  );
}

// Analytics event tracking functions
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "", {
      page_title: title || document.title,
      page_location: url,
    });
  }
};

// Property-specific tracking
export const trackPropertyView = (propertyId: number, propertyTitle: string) => {
  trackEvent("view_property", "engagement", propertyTitle, propertyId);
};

export const trackPropertySearch = (searchTerm: string, resultCount: number) => {
  trackEvent("search_properties", "engagement", searchTerm, resultCount);
};

export const trackPropertyFavorite = (propertyId: number, action: "add" | "remove") => {
  trackEvent(`${action}_favorite`, "engagement", `property_${propertyId}`);
};

export const trackContactForm = (formType: string) => {
  trackEvent("contact_form_submit", "conversion", formType);
};

export const trackPropertyInquiry = (propertyId: number) => {
  trackEvent("property_inquiry", "conversion", `property_${propertyId}`);
};

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: {
        page_title?: string;
        page_location?: string;
        event_category?: string;
        event_label?: string;
        value?: number;
        send_page_view?: boolean;
        [key: string]: any; // Allow other GA parameters
      }
    ) => void;
  }
}
