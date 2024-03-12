import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/backend/ConnectDB";
import SavedPosts from "@/backend/SavedPosts";
import { unstable_noStore as noStore } from "next/cache";
import { getServerSession } from "next-auth";
import authOptions from "@/backend/authOptions";

export const GET = async (request: NextRequest) => {
  noStore();
  await ConnectDB();
  const saved_posts = await SavedPosts.find();
  return NextResponse.json(saved_posts);
};
