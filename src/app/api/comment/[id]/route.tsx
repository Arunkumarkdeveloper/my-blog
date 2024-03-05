import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/backend/ConnectDB";
import CommentShcema from "@/backend/CommentShcema";

export const POST = async (
  request: NextRequest,
  { params }: { params: { id: any } }
) => {
  await ConnectDB();
  const { userName, userId, commentText } = await request.json();
  await CommentShcema.create({
    postId: params.id,
    userName,
    userId,
    commentText,
  });
  return NextResponse.json(
    { message: "comment add to this post" },
    { status: 201 }
  );
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: any } }
) => {
  await ConnectDB();
  const cmt = await CommentShcema.find({ postId: params.id });
  const cmts_lists = cmt.map((cmts) => cmts._id);

  for (let i = 0; i < cmts_lists.length; i++) {
    await CommentShcema.findByIdAndDelete(cmts_lists[i]);
  }
  return NextResponse.json({ message: "comments deleted" }, { status: 201 });
};
