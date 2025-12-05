"use client";
import { ThemeProvider } from "next-themes";
import Navigation from "./Navigation";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Navigation />
      {children}
    </ThemeProvider>
  );
}
