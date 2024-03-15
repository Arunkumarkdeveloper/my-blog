import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/backend/ConnectDB";
import BlogShcema from "@/backend/BlogShcema";
import { getServerSession } from "next-auth";
import authOptions from "@/backend/authOptions";

export const POST = async (request: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (session) {
    await ConnectDB();
    const {
      image,
      affiliateLink,
      blogTitle,
      description,
      urlLink,
      seoKeywords,
      editorHtml,
    } = await request.json();
    await BlogShcema.create({
      image,
      affiliateLink,
      blogTitle,
      description,
      urlLink,
      seoKeywords,
      editorHtml,
    });
    return NextResponse.json(
      { message: "New blog created..." },
      { status: 201 }
    );
  } else {
    return NextResponse.json({ message: "Unauthorized user" });
  }
};

export const GET = async (request: NextRequest) => {
  await ConnectDB();
  const blogs = await BlogShcema.find();
  return NextResponse.json(blogs, { status: 200 });
};
