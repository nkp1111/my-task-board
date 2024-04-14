// jwt
export const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY || "some other secret";
export const JWT_EXPIRE_TIME: string = process.env.JWT_EXPIRE_TIME || "1d";
export const JWT_COOKIE_NAME: string = process.env.JWT_COOKIE_NAME || "token_happy";
export const COOKIE_EXPIRE_TIME: number = 24 * 60 * 60 * 1000;  // number of milliseconds(max age of 1 day)  