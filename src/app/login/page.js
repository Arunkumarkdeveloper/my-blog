import Auth from "@/frontend/section/Auth";
import { cookies } from "next/headers";

export default async function Page() {
  async function createCookie(data) {
    "use server";
    cookies().set("jwtToken", data);
  }
  return <Auth authType="login" createCookie={createCookie} />;
}
