import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/backend/ConnectDB";
import SavedPosts from "@/backend/SavedPosts";

export const GET = async (request: NextRequest) => {
  await ConnectDB();
  const saved_posts = await SavedPosts.find();
  return NextResponse.json(saved_posts);
};
