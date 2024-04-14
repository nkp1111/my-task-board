import { hash, compare } from "bcrypt";

export const hashPassword = async (password: string) => {
  return await hash(password, 10);
}

export const verifyPassword = async (password: string, savedPassword: string) => {
  return await compare(password, savedPassword);
}