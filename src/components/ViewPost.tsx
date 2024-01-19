export default function ViewPost({ post }: { post: any }) {
  const { blogTitle, editorHtml, affliteLink } = post;
  return (
    <div>
      <h1>{blogTitle}</h1>
      <div dangerouslySetInnerHTML={{ __html: editorHtml }} />
      <button>
        <a href={post.affliteLink} target="_blank">
          visit
        </a>
      </button>
    </div>
  );
}
