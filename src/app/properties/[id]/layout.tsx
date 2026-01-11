import { Metadata } from "next";


// This will be overridden by the page component with dynamic metadata
export const metadata: Metadata = {
  title: "Property Details | VestaNest",
  description: "View detailed information about this property on VestaNest.",
};

export default function PropertyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
