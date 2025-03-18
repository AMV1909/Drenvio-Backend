import { connect } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env"
    );
}

export const connectDB = (async () =>
    await connect(MONGODB_URI, {
        dbName: "tienda",
    })
        .then(() => console.log("Connected to DB"))
        .catch((err) => {
            console.log(err);
            process.exit(1);
        }))();
