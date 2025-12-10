import { Metadata } from "next";
import { seoMetadata } from "../../lib/seo";

export const metadata: Metadata = seoMetadata.properties();

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
