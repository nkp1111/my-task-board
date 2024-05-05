import { ZodError } from "zod";

export const validationErrorMessage = (error: ZodError) => {
  return error.issues[0].path.join(" -> ") + " : " + error.issues[0].message
}