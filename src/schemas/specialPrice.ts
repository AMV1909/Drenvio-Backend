import { number, object, string } from "zod";

export const createSpecialPriceSchema = object({
    productId: string().min(1),
    userId: string().min(1),
    price: number().min(0),
});

export const updateSpecialPriceSchema = object({
    price: number().min(0),
});
