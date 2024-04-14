import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
import { JWT_COOKIE_NAME, JWT_EXPIRE_TIME, JWT_SECRET_KEY } from "@/constant/auth";


// use this function for authentication inside api routes 
export default async function sendToken(
  user: any,
  message: string,
) {

  // if not user return
  if (!user) return NextResponse.json({ error: "user is not present" }, { status: 400 })

  // get jwt token
  const token = await sign(
    { id: user._id },
    JWT_SECRET_KEY,
    { expiresIn: JWT_EXPIRE_TIME },
  )

  // set token in cookie
  cookies().set(JWT_COOKIE_NAME, token);

  // send response back
  return NextResponse.json({ token, user, success: message || true });
}