import type { RequestHandler } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { specialPriceSchema } from "../models/specialPrices";

export const getAllSpecialPrices: RequestHandler = async (req, res) => {
    try {
        const specialPrices = await specialPriceSchema
            .find()
            .populate("user")
            .populate("product");

        return res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            specialPrices
        });
    } catch (error) {
        console.error("Error getting special prices:", error);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        });
    }
};

export const createSpecialPrice: RequestHandler = async (req, res) => {
    try {
        const specialPrice = await specialPriceSchema.create(req.body);

        return res.status(StatusCodes.CREATED).json({
            message: ReasonPhrases.CREATED,
            specialPrice,
        });
    } catch (error) {
        console.error("Error creating special price:", error);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        });
    }
};

export const updateSpecialPrice: RequestHandler = async (req, res) => {
    try {
        const specialPrice = await specialPriceSchema.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        return res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            specialPrice,
        });
    } catch (error) {
        console.error("Error updating special price:", error);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        });
    }
};

export const deleteSpecialPrice: RequestHandler = async (req, res) => {
    try {
        await specialPriceSchema.findByIdAndDelete(req.params.id);

        return res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
        });
    } catch (error) {
        console.error("Error deleting special price:", error);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        });
    }
};
