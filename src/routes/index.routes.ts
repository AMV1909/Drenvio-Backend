import { Router } from "express";

import { productsRouter } from "./products.routes";
import { specialPricesRouter } from "./specialPrices.routes";
import { usersRouter } from "./users.routes";

const indexRouter = Router();

indexRouter.use("/products", productsRouter);
indexRouter.use("/special-prices", specialPricesRouter);
indexRouter.use("/users", usersRouter);

export { indexRouter };
