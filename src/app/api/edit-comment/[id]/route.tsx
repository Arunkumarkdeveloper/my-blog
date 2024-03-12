import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/backend/ConnectDB";
import CommentShcema from "@/backend/CommentShcema";
import { getServerSession } from "next-auth";
import authOptions from "@/backend/authOptions";

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: any } }
) => {
  const session = await getServerSession(authOptions);
  if (session) {
    await ConnectDB();
    const commentId = params.id;
    const { postID, userName, userId, commentText, currentUserId } =
      await request.json();

    if (currentUserId === userId) {
      await CommentShcema.findByIdAndUpdate(commentId, {
        postID,
        userName,
        userId,
        commentText,
      });

      return NextResponse.json(
        { message: "This comment is updated" },
        { status: 201 }
      );
    }
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
    await CommentShcema.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "This comment is Deleted" });
  } else {
    return NextResponse.json({ message: "Unauthorized user" });
  }
};
