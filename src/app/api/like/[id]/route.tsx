import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/backend/ConnectDB";
import LikeSchema from "@/backend/LikeSchema";

export const POST = async (
  request: NextRequest,
  { params }: { params: { id: any } }
) => {
  await ConnectDB();
  const { userId } = await request.json();
  await LikeSchema.create({ postId: params.id, userId });
  return NextResponse.json(
    { message: "Like added this post" },
    { status: 201 }
  );
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: any } }
) => {
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
};
