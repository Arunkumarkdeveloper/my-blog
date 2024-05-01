import { NextRequest, NextResponse } from "next/server";
import EcommerceSchema from "@/backend/EcommerceSchema";
import { ConnectDB } from "@/backend/ConnectDB";
import { getServerSession } from "next-auth";
import authOptions from "@/backend/authOptions";

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: any } }
) => {
  //   const session = await getServerSession(authOptions);
  //   if (session) {
  await ConnectDB();
  const id = params.id;
  const { image, title, description, buyLink } = await request.json();
  await EcommerceSchema.findByIdAndUpdate(id, {
    image,
    title,
    description,
    buyLink,
  });
  return NextResponse.json({ message: "product updated..." }, { status: 201 });
  //   } else {
  //     return NextResponse.json({ message: "Unauthorized user" });
  //   }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: any } }
) => {
  //   const session = await getServerSession(authOptions);
  //   if (session) {
  await ConnectDB();
  const id = params.id;
  await EcommerceSchema.findByIdAndDelete(id);
  return NextResponse.json({ message: "product deleted..." }, { status: 200 });
  //   } else {
  //     return NextResponse.json({ message: "Unauthorized user" });
  //   }
};
