"use client";
import { useEffect } from "react";


export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== "production") return;

    // Web Vitals measurement
    const measureWebVitals = () => {
      // First Contentful Paint (FCP)
      if ("PerformanceObserver" in window) {
        const fcpObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === "first-contentful-paint") {
              const fcp = entry.startTime;
              console.log("FCP:", fcp);
              // Send to analytics
              sendToAnalytics("FCP", fcp);
            }
          }
        });
        fcpObserver.observe({ entryTypes: ["paint"] });

        // Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          const lcp = lastEntry.startTime;
          console.log("LCP:", lcp);
          sendToAnalytics("LCP", lcp);
        });
        lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const fidEntry = entry as any;
            const fid = fidEntry.processingStart - fidEntry.startTime;
            console.log("FID:", fid);
            sendToAnalytics("FID", fid);
          }
        });
        fidObserver.observe({ entryTypes: ["first-input"] });

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (!(entry as any).hadRecentInput) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              clsValue += (entry as any).value;
            }
          }
          console.log("CLS:", clsValue);
          sendToAnalytics("CLS", clsValue);
        });
        clsObserver.observe({ entryTypes: ["layout-shift"] });
      }

      // Time to First Byte (TTFB)
      const navigationEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
        console.log("TTFB:", ttfb);
        sendToAnalytics("TTFB", ttfb);
      }
    };

    // Send metrics to analytics
    const sendToAnalytics = (metric: string, value: number) => {
      // Google Analytics 4
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", metric, {
          event_category: "Web Vitals",
          value: Math.round(value),
          non_interaction: true,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
      }

      // Custom analytics endpoint
      if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
        fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            metric,
            value,
            url: window.location.href,
            timestamp: Date.now(),
          }),
        }).catch((error) => {
          console.error("Failed to send analytics:", error);
        });
      }
    };

    // Measure performance after page load
    if (document.readyState === "complete") {
      measureWebVitals();
    } else {
      window.addEventListener("load", measureWebVitals);
    }

    // Resource timing analysis
    const analyzeResources = () => {
      const resources = performance.getEntriesByType("resource");
      const slowResources = resources.filter((resource) => resource.duration > 1000);
      
      if (slowResources.length > 0) {
        console.warn("Slow resources detected:", slowResources);
        sendToAnalytics("SLOW_RESOURCES", slowResources.length);
      }
    };

    // Analyze resources after a delay to ensure all are loaded
    setTimeout(analyzeResources, 5000);

    return () => {
      window.removeEventListener("load", measureWebVitals);
    };
  }, []);

  return null; // This component doesn't render anything
}

// gtag is declared in GoogleAnalytics.tsx
