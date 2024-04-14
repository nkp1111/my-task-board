import { cookies } from "next/headers";
import { JWT_COOKIE_NAME } from "@/constant/auth";


export const logoutUser = async () => {
  try {
    cookies().set(JWT_COOKIE_NAME, "", {
      maxAge: 0
    })
    return { success: "User logout" }
  } catch (error) {
    return { error }
  }
}