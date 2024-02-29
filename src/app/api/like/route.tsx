import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/backend/ConnectDB";
import LikeSchema from "@/backend/LikeSchema";

export const GET = async (requst: NextRequest) => {
  await ConnectDB();
  const likes = await LikeSchema.find();
  return NextResponse.json(likes, { status: 200 });
};
