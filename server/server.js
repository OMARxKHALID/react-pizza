import path from "path";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import fs from "fs";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors());

app.use(bodyParser.json());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const logMiddleware = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
};
app.use(logMiddleware);

app.use("/api/users", userRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/order", orderRoutes);
// app.use("/api/payments", paymentRoutes);

// Serve static files if in production
if (process.env.NODE_ENV === "production") {
  const frontendDistDir = path.join(__dirname, "client", "dist");
  if (fs.existsSync(frontendDistDir)) {
    app.use(express.static(frontendDistDir));

    app.get("*", (req, res) => {
      res.sendFile(path.resolve(frontendDistDir, "index.html"));
    });
  } else {
    console.error("client dist directory not found.");
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
