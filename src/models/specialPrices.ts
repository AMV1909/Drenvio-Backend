import { model, Schema } from "mongoose";

interface SpecialPrice {
    productId: string;
    userId: string;
    price: number;
}

const specialPrice = new Schema<SpecialPrice>(
    {
        productId: {
            ref: "productos",
            type: String,
            required: true,
        },
        userId: {
            ref: "usersMorales11",
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

specialPrice.virtual("product", {
    ref: "productos",
    localField: "productId",
    foreignField: "_id",
    justOne: true,
});

specialPrice.virtual("user", {
    ref: "usersMorales11",
    localField: "userId",
    foreignField: "_id",
    justOne: true,
});

export const specialPriceSchema = model("preciosEspecialesMorales11", specialPrice);
