import bcrypt from "bcrypt";
import dotenv from "dotenv";
import userModel from "../models/userModel.js";

dotenv.config();

const seedAdmin = async () => {
    try {
        const password = process.env.ADMIN_PASSWORD;
        if (!password) {
            throw new Error("ADMIN_PASSWORD is missing in .env file");
        }
        const existingAdmin = await userModel.findOne({ email: process.env.ADMIN_EMAIL });

        if (existingAdmin) {
            console.log("Admin already exists");
            return;
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await userModel.create({
            name: "Admin",
            email: process.env.ADMIN_EMAIL,
            password: hashPassword,
            role: "admin",
        });

        console.log(" Admin created successfully");

    } catch (error) {
        console.error(" Error in seedAdmin:", error.message);
    }
};

export default seedAdmin;