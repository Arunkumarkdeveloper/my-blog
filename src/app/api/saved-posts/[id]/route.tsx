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

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: any } }
) => {
  await ConnectDB();
  const deleteSaved = await SavedPosts.find({ postId: params.id });
  const deletedSavedId = deleteSaved.map((post) => post._id);

  for (let i = 0; i < deleteSaved.length; i++) {
    await SavedPosts.findByIdAndDelete(deletedSavedId[i]);
  }

  return NextResponse.json(
    { message: "saved posts are deleted" },
    { status: 201 }
  );
};
