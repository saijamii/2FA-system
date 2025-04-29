// server.js
import express, { json, urlencoded } from "express";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import bodyParser from "body-parser";
import { Totp } from "time2fa";
import "dotenv/config";
import dbConnect from "./config/dbConnect.js";
import authRoutes from "./routes/authRoutes.js";
import "./config/passportConfig.js";
const app = express();

const corsOptions = {
  origin: ["http://localhost:3001"],
  credentials: true,
};

dbConnect();

// Middleware
app.use(json({ limit: "100mb" }));
app.use(urlencoded({ limit: "100mb", extended: true }));
app.use(cors(corsOptions));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "my-session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 6000 * 60,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

let userSecrets = {};

// Routes
app.use("/api/auth", authRoutes);

// Listen app
const port = process.env.PORT || 7001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
