import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/backend/ConnectDB";
import CommentShcema from "@/backend/CommentShcema";

export const POST = async (
  request: NextRequest,
  { params }: { params: { id: any } }
) => {
  await ConnectDB();
  const { user, commentText } = await request.json();
  await CommentShcema.create({ postId: params.id, user, commentText });
  return NextResponse.json(
    { message: "comment add to this post" },
    { status: 201 }
  );
};
