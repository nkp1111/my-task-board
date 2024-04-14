import { NextRequest } from 'next/server'
import { JwtPayload, verify } from 'jsonwebtoken'
import { User } from '@/db/schema/users';
import { JWT_COOKIE_NAME, JWT_SECRET_KEY } from '@/constant/auth';


// to get user info from jwt token
export default async function getJwtUser(request: NextRequest) {
  // get token from cookie
  const token: string = request.cookies.get(JWT_COOKIE_NAME)?.value as string;
  // get data from token
  const tokenDecrypted = await verify(token, JWT_SECRET_KEY) as JwtPayload;
  // get user by id
  const currentUserId: string = tokenDecrypted?.id || "";
  let user: (object | null) = null;
  if (currentUserId) {
    user = await User.findById(currentUserId)
  }
  return user;
}