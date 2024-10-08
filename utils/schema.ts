import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters long"),
});

export const registerSchema = z
    .object({
        email: z
            .string()
            .min(1, "Email is required")
            .email("Invalid email address"),
        password: z
            .string()
            .min(1, "Password is required")
            .min(6, "Password must be at least 6 characters long"),
        confirmPassword: z
            .string()
            .min(1, "Confirm password is required")
            .min(6, "Confirm password must be at least 6 characters long"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address"),
});

export const todoSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
});
