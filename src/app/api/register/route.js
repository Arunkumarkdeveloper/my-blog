import { Database } from "../../../backend/Database";
import User from "../../../backend/schema/User";
import { NextRequest, NextResponse } from "next/server";
const bcrypt = require("bcrypt");

export const POST = async (request) => {
  try {
    await Database();
    const { userName, email, password } = await request.json();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({ userName, email, password: hashedPassword });
      return NextResponse.json(
        { message: "User registered successfully" },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
