import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/User";
import { connectToDatabase } from "@/app/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "email already exist" },
        { status: 400 }
      );
    }

    await User.create({
      email,
      password,
    });

    return NextResponse.json(
      { message: "user registered successful" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}
