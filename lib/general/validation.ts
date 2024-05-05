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


const TaskValidationSchema = z.object({
  name: z.string().min(1),
  status: z.string().min(1),
  description: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  completedAt: z.union([z.string(), z.date()]).optional().nullable(),
  note: z.string().optional().nullable(),
})


const GoalValidationSchema = z.object({
  name: z.string().min(1),
  // userId: z.string().uuid(),
  tasks: z.array(TaskValidationSchema)
})


export {
  UserValidationSchema,
  TaskValidationSchema,
  GoalValidationSchema,
}