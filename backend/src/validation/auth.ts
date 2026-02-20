import { z } from 'zod'

export const signUpBodySchema = z.object({
    email: z.email({ message: "Invalid email" }),
    password: z.string().min(8, "Password must be at least 8 characters"),
})

export const signInBodySchema = z.object({
    email: z.email({ message: "Invalid email" }),
    password: z.string().min(1, "Password is required"),
})

export const signInResponseSchema = z.object({
    user: z.object({
        id: z.string(),
        email: z.email(),
        createdAt: z.string()
    }),
    token: z.string()
})

