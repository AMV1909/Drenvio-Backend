import { ReasonPhrases, StatusCodes } from "http-status-codes";
import type { RequestHandler } from "express";

import { productSchema } from "../models/product";
import { specialPriceSchema } from "../models/specialPrices";

export const getAllProducts: RequestHandler = async (req, res) => {
    try {
        const products = await productSchema.find();

        const specialPrices = await specialPriceSchema.find({
            userId: req.payload._id,
        });

        products.forEach((product) => {
            const specialPrice = specialPrices.find(
                (specialPrice) => specialPrice.productId === product.id
            );

            if (specialPrice) {
                product.price = specialPrice.price;
            }

            return product;
        });

        return res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            products,
        });
    } catch (error) {
        console.error("Error getting products:", error);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        });
    }
};
