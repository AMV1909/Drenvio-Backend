import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import type { RequestHandler } from "express";

import type { User } from "../models/user";
import { UserRequest } from "../types/types";

const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
    throw new Error("SECRET_KEY is not defined");
}

// Generate a token
// payload: data to be stored in the token
// expiresIn: time in which the token expires (e.g. "24h")
export const generateToken = (
    payload: object,
    expiresIn: "1h" | "24h" = "24h"
) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

// Verify a token
// This function is used as middleware in the routes
// Purpose: Check if the user is logged in
export const verifyToken: RequestHandler = (req: UserRequest, res, next) => {
    // Get the token from the headers
    const token = (req.headers["authorization"] as string).split(" ")[1];

    // If there is no token, return an error
    if (!token)
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ auth: false, message: "No token provided" });

    // If there is a token, verify it with the secret key
    // We use env variables to hide sensitive data
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        // If the token is invalid, return an error
        if (err)
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: "Failed to authenticate token" });

        if (!decoded) return res.sendStatus(StatusCodes.UNAUTHORIZED);

        req.payload = decoded as User;

        next();
    });
};
