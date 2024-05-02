import { cookies } from "next/headers";
import { JwtPayload, verify } from 'jsonwebtoken'

import { User } from '@/models/users';
import { JWT_COOKIE_NAME, JWT_SECRET_KEY } from '@/constant/auth';


// to get user info from jwt token
export default async function getJwtUser() {
  // get token from cookie
  const token: string = cookies().get(JWT_COOKIE_NAME)?.value as string;
  if (!token) return null;

  // get data from token
  const tokenDecrypted = await verify(token, JWT_SECRET_KEY) as JwtPayload;
  if (!tokenDecrypted) return null;

  // TODO: handle token not found properly


  // get user by id
  const currentUserId: string = tokenDecrypted?.id || "";
  let user: (UserTypeSchema | null) = null;
  if (currentUserId) {
    user = await User.findById(currentUserId);
  }
  return user;
}