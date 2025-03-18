import { model, Schema } from "mongoose";

export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
}

export const userSchema = model(
    "usersMorales11",
    new Schema<User>(
        {
            name: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
                unique: true,
            },
            password: {
                type: String,
                required: true,
            },
        },
        {
            timestamps: true,
        }
    )
);
