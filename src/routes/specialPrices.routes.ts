import { Router } from "express";

// Middlewares
import { verifyToken } from "../middlewares/jwt";
import { validateData } from "../middlewares/zodValidation";

// Schemas
import {
    createSpecialPriceSchema,
    updateSpecialPriceSchema,
} from "../schemas/specialPrice";

// Controllers
import {
    getAllSpecialPrices,
    createSpecialPrice,
    updateSpecialPrice,
    deleteSpecialPrice,
} from "../controllers/specialPrices.controller";

const specialPricesRouter = Router();

specialPricesRouter.get("/", verifyToken, getAllSpecialPrices);
specialPricesRouter.post(
    "/",
    verifyToken,
    validateData(createSpecialPriceSchema),
    createSpecialPrice
);
specialPricesRouter.put(
    "/:id",
    verifyToken,
    validateData(updateSpecialPriceSchema),
    updateSpecialPrice
);
specialPricesRouter.delete("/:id", verifyToken, deleteSpecialPrice);

export { specialPricesRouter };
