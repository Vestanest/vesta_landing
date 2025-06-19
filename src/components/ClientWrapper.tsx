"use client";
import { ThemeProvider } from "../contexts/ThemeContext";
import Navigation from "./Navigation";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <Navigation />
      {children}
    </ThemeProvider>
  );
}
