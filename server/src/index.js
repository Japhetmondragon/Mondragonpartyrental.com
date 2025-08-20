import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import { mongoSanitizeAll } from "./middleware/mongoSanitize.js";
import { sanitizeBody, sanitizeQuery } from "./middleware/sanitize.js";

const app = express();

await connectDB();

app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_ORIGIN?.split(",") || "http://localhost:5173",
  credentials: true
}));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(mongoSanitizeAll); 
app.use(sanitizeQuery);
app.use(sanitizeBody);

if (process.env.NODE_ENV !== "test") app.use(morgan("tiny"));

app.get("/api/health", (req, res) => res.json({ ok: true }));

// 404
app.use((req, res) => res.status(404).json({ message: "Not Found" }));
// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server Error" });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API on :${port}`));

export default app;
