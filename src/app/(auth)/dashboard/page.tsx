import DashBoard from "@/components/authentication/DashBoard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "dashboard",
  description: "dashboard page",
};

export default function page() {
  return <DashBoard />;
}
