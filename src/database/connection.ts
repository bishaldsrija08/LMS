//Database Connection Code
import mongoose from "mongoose";


const MONGODB_CS = process.env.MONGODB_CS

if (!MONGODB_CS) {
    throw new Error("You must provide mongodb connection string.")
}

const dbConnect = async () => {
    try {
        await mongoose.connect(MONGODB_CS)
        console.log("Database connected successfully 😄!");

    } catch (error) {
        console.log("Error connection .. 🥹",error)
    }
}

export default dbConnect