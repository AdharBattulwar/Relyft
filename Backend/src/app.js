import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({
  path: "./src/config/.env",
});

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// CORS configuration
const whitelist = process.env.WHITELIST_DOMAINS ? process.env.WHITELIST_DOMAINS.split(",") : [];

// CORS middleware
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || whitelist.indexOf(origin) !== -1) {
      console.log(`CORS allowed for origin: ${origin}`);
      callback(null, true);
    } else {
      console.error(`CORS not allowed for origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Added OPTIONS
  credentials: true,
};

// Use CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", (req, res) => {
  console.log(`Preflight request for route: ${req.originalUrl}`);
  res.header("Access-Control-Allow-Origin", whitelist.join(","));
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200); // Respond with 200 OK
});

// Routes
app.use("/api/v1/user", userRouter);

// Example middleware to log requests
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.originalUrl}`);
  next();
});

export default app;
