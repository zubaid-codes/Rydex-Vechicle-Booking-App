import connectDB from "@/lib/db";
import { sendMAil } from "@/lib/sendMail";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    await connectDB();
    let user = await User.findOne({ email });
    if (user && user.isEmailVerified) {
      return NextResponse.json(
        { message: "Email Already exists!" },
        { status: 400 },
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters long!" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    if (user && !user.isEmailVerified) {
      ((user.name = name),
        (user.password = hashedPassword),
        (user.email = email));
      ((user.otp = otp), (user.otpExpiresAt = otpExpiresAt));
      await user.save();
    } else {
      user = await User.create({
        name,
        email,
        password: hashedPassword,
        otp,
        otpExpiresAt
      });
    }

    await sendMAil(
      email,
      "Your OTP for Email verification...",
      `<h2>Your OTP for Email verification is <strong>${otp} </strong> </h2>`
    );

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: `Register Error ${error}` },
      { status: 500 },
    );
  }
}
