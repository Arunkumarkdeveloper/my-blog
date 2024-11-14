import { EmailTemplate } from "@/frontend/utility";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { email, subject } = await request.json();
    EmailTemplate(email, subject);
    return NextResponse.json({ message: "Success: email was sent" });
  } catch (error) {
    console.log(error);
    NextResponse.status(500).json({ message: "COULD NOT SEND MESSAGE" });
  }
};
