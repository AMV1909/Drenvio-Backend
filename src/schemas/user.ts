import { object, string, z } from "zod";

export const createUserSchema = object({
    name: string().min(1),
    email: string().email(),
    password: string().min(8),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
