import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";

import { COOKIE_EXPIRE_TIME, JWT_COOKIE_NAME, JWT_EXPIRE_TIME, JWT_SECRET_KEY } from "@/constant/auth";


// use this function for authentication inside api routes 
export default async function sendToken(
  user: any,
) {

  // if not user return
  if (!user) return { error: "user is not present" }

  // get jwt token
  const token = await sign(
    { id: user._id },
    JWT_SECRET_KEY,
    { expiresIn: JWT_EXPIRE_TIME },
  )

  // set token in cookie
  cookies().set(JWT_COOKIE_NAME, token, {
    httpOnly: true,
    maxAge: COOKIE_EXPIRE_TIME,
    sameSite: 'none',
    secure: true
  });

  // send response back
  return { token };
}