import { Database } from "@/backend/Database";
import Subscribe from "@/backend/schema/Subscribe";
import { NextResponse } from "next/server";

export const DELETE = async (request, { params }) => {
  try {
    await Database();
    const id = params.id;
    const output = await Subscribe.deleteOne({ _id: id });
    if (output.deletedCount === 0) {
      return NextResponse.json(output, { status: 404 });
    }
    return NextResponse.json(output, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
