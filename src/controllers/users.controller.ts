import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { hash, compare } from "bcrypt";
import type { RequestHandler } from "express";

import { userSchema } from "../models/user";
import { generateToken } from "../middlewares/jwt";
import type { CreateUserSchema } from "../schemas/user";

export const getAllUsers: RequestHandler = async (req, res) => {
    try {
        const users = await userSchema.find();

        return res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            users,
        });
    } catch (error) {
        console.error("Error getting users:", error);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        });
    }
};

export const createUser: RequestHandler = async (req, res) => {
    try {
        const data: CreateUserSchema = req.body;

        const isEmailInUse = await userSchema.findOne({ email: data.email });

        if (isEmailInUse) {
            return res.status(StatusCodes.CONFLICT).json({
                message: ReasonPhrases.CONFLICT,
            });
        }

        const hashedPassword = await hash(data.password, 10);

        await userSchema.create({
            ...data,
            password: hashedPassword,
        });

        return res.status(StatusCodes.CREATED).json({
            message: ReasonPhrases.CREATED,
        });
    } catch (error) {
        console.error("Error creating user:", error);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        });
    }
};

export const login: RequestHandler = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userSchema.findOne({ email });

        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: ReasonPhrases.UNAUTHORIZED,
            });
        }

        const isPasswordCorrect = await compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: ReasonPhrases.UNAUTHORIZED,
            });
        }

        return res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            user,
            token: generateToken(user.toObject()),
        });
    } catch (error) {
        console.error("Error logging in:", error);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        });
    }
};
