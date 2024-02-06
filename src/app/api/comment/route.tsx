import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/backend/ConnectDB";
import CommentShcema from "@/backend/CommentShcema";

export const GET = async (request: NextRequest) => {
  await ConnectDB();
  const comments = await CommentShcema.find();
  return NextResponse.json(comments, { status: 200 });
};
