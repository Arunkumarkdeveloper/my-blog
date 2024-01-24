import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import RegisterForm from "@/components/authentication/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/dashboard");

  return <RegisterForm />;
}
