import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/backend/ConnectDB";
import BlogShcema from "@/backend/BlogShcema";

export const POST = async (request: NextRequest) => {
  await ConnectDB();
  const { image, blogTitle, description, urlLink, editorHtml } =
    await request.json();
  await BlogShcema.create({
    image,
    blogTitle,
    description,
    urlLink,
    editorHtml,
  });
  return NextResponse.json({ message: "New blog created..." }, { status: 201 });
};

export const GET = async (request: NextRequest) => {
  await ConnectDB();
  const blogs = await BlogShcema.find();
  return NextResponse.json(blogs, { status: 200 });
};
