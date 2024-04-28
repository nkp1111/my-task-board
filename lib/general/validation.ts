import { z } from "zod";


const UserValidationSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  status: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
})


const GoalSchema = z.object({})


export {
  UserValidationSchema,
  GoalSchema,
}