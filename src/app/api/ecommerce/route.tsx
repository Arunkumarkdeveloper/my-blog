import { NextRequest, NextResponse } from "next/server";
import EcommerceSchema from "@/backend/EcommerceSchema";
import { ConnectDB } from "@/backend/ConnectDB";
import { getServerSession } from "next-auth";
import authOptions from "@/backend/authOptions";

export const POST = async (request: NextRequest) => {
  const session = await getServerSession(authOptions);
  //   if (session) {
  await ConnectDB();
  const { image, title, description, buyLink } = await request.json();
  await EcommerceSchema.create({ image, title, description, buyLink });
  return NextResponse.json({ message: "New product added!" }, { status: 201 });
  //   } else {
  //     return NextResponse.json({ message: "Unauthorized user" });
  //   }
};

export const GET = async (request: NextRequest) => {
  await ConnectDB();
  const products = await EcommerceSchema.find();
  return NextResponse.json(products, { status: 200 });
};
