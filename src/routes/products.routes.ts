import { Router } from "express";

import { verifyToken } from "../middlewares/jwt";
import { getAllProducts } from "../controllers/products.controller";

const productsRouter = Router();

productsRouter.get("/", verifyToken, getAllProducts);

export { productsRouter };
