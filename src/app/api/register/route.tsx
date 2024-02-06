import { NextRequest, NextResponse } from "next/server";
import UserSchema from "@/backend/UserSchema";
import { ConnectDB } from "@/backend/ConnectDB";
const bcrypt = require("bcrypt");

export const POST = async (request: NextRequest) => {
  await ConnectDB();
  const { name, email, password } = await request.json();
  const hashedPassword = await bcrypt.hash(password, 10);
  await UserSchema.create({ name, email, password: hashedPassword });
  return NextResponse.json({ message: "New user added..." }, { status: 201 });
};
