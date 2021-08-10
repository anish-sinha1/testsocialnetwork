"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const userRouter_1 = __importDefault(require("./routes/api/userRouter"));
const authRouter_1 = __importDefault(require("./routes/api/authRouter"));
dotenv_1.default.config({ path: "src/config/config.env" });
const app = express_1.default();
app.use(express_1.default.json());
database_1.default();
app.use("/api/users", userRouter_1.default);
app.use("/api/auth", authRouter_1.default);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
