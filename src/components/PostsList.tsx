import Link from "next/link";

export default function PostsList({ post }: { post: any }) {
  return (
    <div>
      <h1>{post.blogTitle}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.editorHtml }} />
      <button>{post.affliteLink}</button>
      <Link href={`/post/${post._id}`}>View Post</Link>
    </div>
  );
}
