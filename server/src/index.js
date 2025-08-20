import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
// Middleware
import { mongoSanitizeAll } from "./middleware/mongoSanitize.js";
import { sanitizeBody, sanitizeQuery } from "./middleware/sanitize.js";
import { apiLimiter } from "./middleware/rate.js";
import { notFound, errorHandler } from "./middleware/error.js";
// Routes
import items from "./routes/items.js";
import menu from "./routes/menu.js";
import packages from "./routes/packages.js";
import leads from "./routes/leads.js";
import faq from "./routes/faq.js";
import upload from "./routes/upload.js";
import auth from "./routes/auth.js";

const app = express();

await connectDB();

app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_ORIGIN?.split(",") || "http://localhost:5173",
  credentials: true
}));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

// Sanitization
app.use(mongoSanitizeAll); 
app.use(sanitizeQuery);
app.use(sanitizeBody);

// Logging
if (process.env.NODE_ENV !== "test") app.use(morgan("tiny"));

// Health + Rate limiting
app.get("/api/health", (req, res) => res.json({ ok: true }));
app.use("/api", apiLimiter);

// Mount routes
app.use("/api/items", items);
app.use("/api/menu", menu);
app.use("/api/packages", packages);
app.use("/api/leads", leads);
app.use("/api/faq", faq);
app.use("/api/upload", upload);
app.use("/api/auth", auth);

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
