// jwt
export const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY || "some other secret";
export const JWT_EXPIRE_TIME: string = process.env.JWT_EXPIRE_TIME || "3h";
export const JWT_COOKIE_NAME: string = process.env.JWT_COOKIE_NAME || "token_happy";