import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/backend/ConnectDB";
import CommentShcema from "@/backend/CommentShcema";
import { getServerSession } from "next-auth";
import authOptions from "@/backend/authOptions";

export const POST = async (
  request: NextRequest,
  { params }: { params: { id: any } }
) => {
  const session = await getServerSession(authOptions);
  if (session) {
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
    const cmt = await CommentShcema.find({ postId: params.id });
    const cmts_lists = cmt.map((cmts) => cmts._id);

    for (let i = 0; i < cmts_lists.length; i++) {
      await CommentShcema.findByIdAndDelete(cmts_lists[i]);
    }
    return NextResponse.json({ message: "comments deleted" }, { status: 201 });
  } else {
    return NextResponse.json({ message: "Unauthorized user" });
  }
};

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: any } }
) => {
  await ConnectDB();
  const comments = await CommentShcema.find({ postId: params.id });
  return NextResponse.json(comments);
};
