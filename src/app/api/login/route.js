import { NextResponse } from "next/server";
import { Database } from "@/backend/Database";
import User from "@/backend/schema/User";
const bcrypt = require("bcrypt");
import { SignJWT } from "jose";

const secretKey =
  new TextEncoder().encode(process.env.JWT_SECRET) ||
  "findbestonebusiness-aj@12110410";

export const POST = async (request) => {
  try {
    await Database();
    const { email, password } = await request.json();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = await new SignJWT({
      userId: user._id,
      userName: user.userName,
      email: user.email,
    })
      ?.setProtectedHeader({ alg: "HS256" })
      ?.setExpirationTime("7d")
      ?.sign(secretKey);

    return NextResponse.json(
      { message: "Login successful", token },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
};
