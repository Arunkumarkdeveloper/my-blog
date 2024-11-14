import dynamic from "next/dynamic";
const CreateBlog = dynamic(() => import("@/frontend/admin/CreateBlog"), {
  ssr: false,
});

const getBlog = async (id) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blog/${id}`,
    { cache: "no-store" }
  );
  if (response.ok) {
    return response.json();
  }
};

export default async function Page({ params }) {
  const blog = await getBlog(params.id);
  return <CreateBlog type="edit" blog={blog} />;
}
