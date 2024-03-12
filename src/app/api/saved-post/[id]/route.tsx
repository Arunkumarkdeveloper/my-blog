import { NextRequest, NextResponse } from "next/server";
import SavedPosts from "@/backend/SavedPosts";
import { ConnectDB } from "@/backend/ConnectDB";
import { getServerSession } from "next-auth";
import authOptions from "@/backend/authOptions";

export const POST = async (
  request: NextRequest,
  { params }: { params: { id: any } }
) => {
  const session = await getServerSession(authOptions);
  if (session) {
    await ConnectDB();
    const { userId } = await request.json();
    await SavedPosts.create({ postId: params.id, userId });
    return NextResponse.json(
      { message: "This post is saved" },
      { status: 200 }
    );
  } else {
    return NextResponse.json({ message: "Unauthorized user" });
  }
};

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: any } }
) => {
  const session = await getServerSession(authOptions);
  if (session) {
    await ConnectDB();
    const { userId } = await request.json();
    const saved = await SavedPosts.find();
    const saved_post = saved.filter((item) => params.id === item.postId);
    const user_saved = saved_post.filter((item) => userId === item.userId);
    await SavedPosts.findByIdAndDelete(user_saved.map((item) => item._id));
    return NextResponse.json(
      { message: "Unsaved this post!" },
      { status: 201 }
    );
  } else {
    return NextResponse.json({ message: "Unauthorized user" });
  }
};
