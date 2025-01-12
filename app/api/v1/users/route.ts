import { connectDB } from "@/app/lib/db/connect";
import User from "@/app/lib/db/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();
    const users = await User.find({}).select("-password");
    return NextResponse.json({ users });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
// POST handler - Create new user
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const userData = await request.json();
    console.log("userData", userData);
    const users = await User.find({ email: userData?.email }).select(
      "-password"
    );
    console.log("users", users);

    if (users.length > 0) {
      return NextResponse.json(
        { error: "User with this email already exists!" },
        { status: 400 }
      );
    }
    const newUser = await User.create(userData);
    console.log("newUser", newUser);

    return Response.json({ user: newUser }, { status: 200 });
  } catch (error: any) {
    // 5. Handle specific errors
    if (error.code === 11000) {
      // Duplicate key error (e.g., email already exists)
      return Response.json({ error: error }, { status: 400 });
    }
    return Response.json({ error: error.message }, { status: 500 });
  }
}
