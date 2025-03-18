import { model, Schema } from "mongoose";

interface Product {
    name: string;
    price: number;
    stock: number;
    description: string;
    brand: string;
    sku: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

export const productSchema = model(
    "productos",
    new Schema<Product>(
        {
            name: {
                type: String,
                required: true,
            },

            price: {
                type: Number,
                required: true,
            },
            stock: {
                type: Number,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            brand: {
                type: String,
                required: true,
            },
            sku: {
                type: String,
                required: true,
            },
            tags: {
                type: [String],
                required: true,
            },
        },
        {
            timestamps: true,
        }
    )
);
