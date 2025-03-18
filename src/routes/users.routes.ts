import { Router } from "express";

import { verifyToken } from "../middlewares/jwt";

import {
    getAllUsers,
    createUser,
    login,
} from "../controllers/users.controller";

const usersRouter = Router();

usersRouter.get("/", verifyToken, getAllUsers);

usersRouter.post("/register", createUser);
usersRouter.post("/login", login);

export { usersRouter };
