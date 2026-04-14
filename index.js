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
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);
app.set("layout", "layout");
app.use(cors());
app.use(express.static("public"));
const startServer = async () => {
    await dbConnect();
    await seedAdmin();
    app.listen(8080, () => console.log("Server started"));
};
startServer();
app.use(express.json());

// Session
app.use(
    session({
        secret: "hello123",
        resave: false,
        saveUninitialized: false,
    }),
);

// Make session global in EJS
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

app.use("/admin", authRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter)