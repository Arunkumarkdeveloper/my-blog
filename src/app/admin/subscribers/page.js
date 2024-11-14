import dynamic from "next/dynamic";
import { cookies } from "next/headers";
const Table = dynamic(() => import("@/frontend/section/Table"), {
  ssr: false,
});

export default async function page() {
  const cookieStore = cookies();
  const jwtToken =
    cookieStore.get("jwtToken") && cookieStore.get("jwtToken").value;
  return (
    <div className="layout-center">
      <div className="blog-responsive scroll-x mt-20">
        <Table jwtToken={jwtToken} />
      </div>
    </div>
  );
}
