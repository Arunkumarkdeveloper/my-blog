import {
  currentDate,
  mailOptions,
  transporterOptions,
} from "@/frontend/utility";
import { Database } from "../../../backend/Database";
import Subscribe from "../../../backend/schema/Subscribe";
import { NextRequest, NextResponse } from "next/server";
const nodemailer = require("nodemailer");

export const POST = async (request) => {
  try {
    await Database();
    const { email } = await request.json();
    const existingUser = await Subscribe.findOne({ email });
    console.log("EXIST", existingUser);
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    } else {
      await Subscribe.create({ email, date: currentDate() });
      const transporter = nodemailer.createTransport(transporterOptions);
      const mail = await transporter.sendMail(mailOptions(email, "subscribe"));
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

export const GET = async (request) => {
  try {
    await Database();
    const data = await Subscribe.find();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
