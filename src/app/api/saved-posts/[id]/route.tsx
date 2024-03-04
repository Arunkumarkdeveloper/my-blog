import { NextRequest, NextResponse } from "next/server";
import SavedPosts from "@/backend/SavedPosts";
import { ConnectDB } from "@/backend/ConnectDB";
import BlogShcema from "@/backend/BlogShcema";
import { decode as base64_decode, encode as base64_encode } from "base-64";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: any } }
) => {
  await ConnectDB();
  const userId = base64_decode(params.id);
  const savedPosts = await SavedPosts.find();
  const userSavedPosts = savedPosts.filter((post) => userId === post.userId);
  const savedPostId = userSavedPosts.map((post) => post.postId);

  let _array = [];

  for (let i = 0; i < savedPostId.length; i++) {
    const getSavedPosts = await BlogShcema.findById(savedPostId[i]);
    _array.push(getSavedPosts);
  }

  return NextResponse.json(_array);
};
