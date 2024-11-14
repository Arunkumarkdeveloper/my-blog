import dynamic from "next/dynamic";
import { cookies } from "next/headers";
const CreateBlog = dynamic(() => import("@/frontend/admin/CreateBlog"), {
  ssr: false,
});

export default function Page() {
  const cookieStore = cookies();
  const jwtToken =
    cookieStore.get("jwtToken") && cookieStore.get("jwtToken").value;
  return <CreateBlog type="create" jwtToken={jwtToken} />;
}
