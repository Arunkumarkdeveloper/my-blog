import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/backend/ConnectDB";
import LikeSchema from "@/backend/LikeSchema";
import { unstable_noStore as noStore } from "next/cache";

export const GET = async (requst: NextRequest) => {
  noStore();
  await ConnectDB();
  const likes = await LikeSchema.find();
  return NextResponse.json(likes, { status: 200 });
};
