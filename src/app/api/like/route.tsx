import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/backend/ConnectDB";
import LikeSchema from "@/backend/LikeSchema";
import { unstable_noStore as noStore } from "next/cache";
import { getServerSession } from "next-auth";
import authOptions from "@/backend/authOptions";

export const GET = async (requst: NextRequest) => {
  noStore();
  await ConnectDB();
  const likes = await LikeSchema.find();
  return NextResponse.json(likes, { status: 200 });
};
