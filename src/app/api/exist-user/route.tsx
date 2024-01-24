import { NextRequest, NextResponse } from "next/server";
import UserSchema from "@/backend/UserSchema";
import { ConnectDB } from "@/backend/ConnectDB";

export const POST = async (request: NextRequest) => {
  await ConnectDB();
  const { email } = await request.json();
  const existUser = await UserSchema.findOne({ email }).select("_id");
  return NextResponse.json(existUser);
};
