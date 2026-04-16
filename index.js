import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";

import dbConnect from "./config/db.js";
import seedAdmin from "./config/seedAdmin.js";

import authRouter from "./routes/authRoute.js";
import orderRouter from "./routes/orderRoute.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";

const app = express();

dotenv.config();

app.get("/health", (req, res) => {
    res.status(200).send("OK");
});

app.set("view engine", "ejs");
app.set("views", "views");
app.use(expressLayouts);
app.set("layout", "layout");

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // moved up (best practice)
app.use(cors());
app.use(express.static("public"));

app.use(
    session({
        secret: process.env.SESSION_SECRET || "hello123", // better to use env
        resave: false,
        saveUninitialized: false,
    })
);

app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

app.use("/admin", authRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);

const startServer = async () => {
    try {
        await dbConnect();
        console.log("DB Connected ");

        await seedAdmin();

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT} 🚀`);
        });
    } catch (error) {
        console.error("Server start failed:", error);
    }
};

startServer();