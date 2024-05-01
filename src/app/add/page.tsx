import AddPost from "@/components/AddPost";
import EditPost from "@/components/EditPost";
import { API_URL } from "@/frontend/Path";
import { getServerSession } from "next-auth";
import authOptions from "@/backend/authOptions";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session?.user?.email !== "arunkumarkdeveloper@gmail.com") {
    redirect("/");
  }

  return (
    <div className="d-flex justify-content-center mt-30 mb-30">
      <AddPost />
    </div>
  );
}
