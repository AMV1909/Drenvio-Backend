import { Request } from "express";
import type { User } from "../models/user";

declare global {
    namespace Express {
        interface Request {
            payload: User;
        }
    }
}

export interface UserRequest extends Request {
    payload: User;
}