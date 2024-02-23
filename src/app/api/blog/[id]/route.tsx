import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/backend/ConnectDB";
import BlogShcema from "@/backend/BlogShcema";

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  await ConnectDB();
  const id = params.id;
  const { image, blogTitle, description, urlLink, editorHtml } =
    await request.json();
  await BlogShcema.findByIdAndUpdate(id, {
    image,
    blogTitle,
    description,
    urlLink,
    editorHtml,
  });
  return NextResponse.json({ message: "blog updated..." }, { status: 201 });
};

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: any } }
) => {
  await ConnectDB();
  const id = params.id;
  const blog = await BlogShcema.findOne({ urlLink: id });
  return NextResponse.json(blog, { status: 200 });
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  await ConnectDB();
  const id = params.id;
  await BlogShcema.findByIdAndDelete(id);
  return NextResponse.json({ message: "blog deleted..." }, { status: 200 });
};
