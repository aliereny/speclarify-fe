import "./globals.scss";
import "../../public/antd.min.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { DashboardLayout } from "@/ui/templates/DashboardLayout";

const questrial = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Speclarify",
  description: "Speclarify is a tool for extracting requirements from text.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={questrial.className}>
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
}
