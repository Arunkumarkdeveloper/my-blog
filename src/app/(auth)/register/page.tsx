import authOptions from "@/backend/authOptions";
import RegisterForm from "@/components/authentication/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "register",
  description: "register page",
};

export default async function page() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/login");

  return <RegisterForm />;
}
