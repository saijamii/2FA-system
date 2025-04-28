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

dbConnect();

// Middleware
app.use(json({ limit: "100mb" }));
app.use(urlencoded({ limit: "100mb", extended: true }));
app.use(cors());
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

app.post("/generate-2fa", (req, res) => {
  const { username } = req.body;

  const key = Totp.generateKey({ issuer: "sai", user: username });

  userSecrets[username] = key;

  res.json({
    secret: key.secret,
    url: key.url,
  });
});

app.post("/verify-2fa", (req, res) => {
  try {
    const { username, token } = req.body;

    if (!username || !token) {
      return res
        .status(400)
        .json({ success: false, message: "Username and token are required." });
    }

    const userSecretData = userSecrets[username];

    if (!userSecretData || !userSecretData.secret) {
      return res
        .status(404)
        .json({ success: false, message: "User not found or secret missing." });
    }

    const isTokenValid = Totp.validate({
      passcode: token,
      secret: userSecretData.secret,
    });

    if (!isTokenValid) {
      return res.status(400).json({ success: false, message: "Invalid OTP." });
    }

    return res
      .status(200)
      .json({ success: true, message: "OTP verified successfully!" });
  } catch (error) {
    console.error("Error verifying 2FA token:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
});

// Listen app
const port = process.env.PORT || 7001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
