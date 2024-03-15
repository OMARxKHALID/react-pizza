import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";


dotenv.config();

connectDB(); 

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.use(bodyParser.json());

app.use(express.json({ limit: "50mb"}));
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/menu", menuRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/payments", paymentRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
