import authOptions from "@/backend/authOptions";
import LoginForm from "@/components/authentication/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "login",
  description: "login page",
};

export default async function page() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }
  return (
    <div>
      <LoginForm />
    </div>
  );
}
