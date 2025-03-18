import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ZodError, type ZodTypeAny } from "zod";
import type { RequestHandler } from "express";

type ValidateData = (schema: ZodTypeAny) => RequestHandler;

export const validateData: ValidateData = (schema: ZodTypeAny) => {
    return (req, res, next) => {
        try {
            req.body = schema.parse(req.body);

            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessage = error.errors.map((err) => ({
                    message: `${err.path.join(".")} is ${err.message}`,
                }));

                return res
                    .status(StatusCodes.BAD_REQUEST)
                    .json({ message: errorMessage });
            } else {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    message: ReasonPhrases.INTERNAL_SERVER_ERROR,
                });
            }
        }
    };
};
