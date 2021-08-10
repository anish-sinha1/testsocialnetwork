import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/database";
import userRouter from "./routes/api/userRouter";
import authRouter from "./routes/api/authRouter";

dotenv.config({ path: "src/config/config.env" });

const app = express();
app.use(express.json());

connectDB();

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
