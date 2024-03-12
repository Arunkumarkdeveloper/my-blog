import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/backend/ConnectDB";
import LikeSchema from "@/backend/LikeSchema";
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
    await LikeSchema.create({ postId: params.id, userId });
    return NextResponse.json(
      { message: "Like added this post" },
      { status: 201 }
    );
  } else {
    return NextResponse.json({ message: "Unauthorized user" });
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: any } }
) => {
  const session = await getServerSession(authOptions);
  if (session) {
    await ConnectDB();
    const likes = await LikeSchema.find({ postId: params.id });
    const like_counts = likes.map((like) => like._id);

    for (let i = 0; i < like_counts.length; i++) {
      await LikeSchema.findByIdAndDelete(like_counts[i]);
    }
    return NextResponse.json(
      { message: "Likes deleted this post" },
      { status: 201 }
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
    const likes = await LikeSchema.find();
    const post_likes = likes.filter((like) => params.id === like.postId);
    const post_user = post_likes.filter((user) => userId === user.userId);
    await LikeSchema.findByIdAndDelete(post_user.map((item) => item._id));
    return NextResponse.json(
      { message: "Unliked this post!" },
      { status: 201 }
    );
  } else {
    return NextResponse.json({ message: "Unauthorized user" });
  }
};
