import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/backend/ConnectDB";
import BlogShcema from "@/backend/BlogShcema";
import { getServerSession } from "next-auth";
import authOptions from "@/backend/authOptions";

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const session = await getServerSession(authOptions);
  if (session) {
    await ConnectDB();
    const id = params.id;
    const { image, blogTitle, description, urlLink, editorHtml, seoKeywords } =
      await request.json();
    await BlogShcema.findByIdAndUpdate(id, {
      image,
      blogTitle,
      description,
      urlLink,
      editorHtml,
      seoKeywords,
    });
    return NextResponse.json({ message: "blog updated..." }, { status: 201 });
  } else {
    return NextResponse.json({ message: "Unauthorized user" });
  }
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
  const session = await getServerSession(authOptions);
  if (session) {
    await ConnectDB();
    const id = params.id;
    await BlogShcema.findByIdAndDelete(id);
    return NextResponse.json({ message: "blog deleted..." }, { status: 200 });
  } else {
    return NextResponse.json({ message: "Unauthorized user" });
  }
};
