import connectDB from "@/lib/db";
import User from "@/models/user.model";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, otp } = await req.json();
    if (!email && !otp) {
      return Response.json(
        { message: "Email and otp is required!" },
        { status: 400 },
      );
    }

    let user = await User.findOne({ email });
    if (!user) {
      return Response.json({ message: "User not found!" }, { status: 400 });
    }

    if (user.isEmailVerified) {
      return Response.json(
        { message: "Email is Already verified!" },
        { status: 400 },
      );
    }

    if (!user.otpExpiresAt || user.otpExpiresAt < new Date()) {
      return Response.json(
        { message: "Otp has been Expired!" },
        { status: 400 },
      );
    }

    if (!user.otp || user.otp != otp) {
      return Response.json({ message: "Invalid otp!" }, { status: 400 });
    }

    user.isEmailVerified = true;
    user.otp = undefined;
    user.otpExpiresAt = undefined;

    await user.save();

    return Response.json({ message: "Email is Verified!" }, { status: 200 });


  } catch (error) {
    return Response.json({ message: "Verify Error!",error }, { status: 500 });
  }
}
