import bcrypt from "bcrypt";
import User from "../models/user.js";
import speakeasy from "speakeasy";
import qrcode from "qrcode";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      isMfaActive: false,
    });
    console.log("New User : ", newUser);
    await newUser.save();
    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error registering user", error);
    res.status(500).json({
      error: `Error registering user`,
      message: error,
    });
  }
};

export const login = async (req, res) => {
  console.log("The authenticated user is : ", req.user);
  res.status(200).json({
    message: "User logged in successfully",
    username: req.user.username,
    isMfaActive: req.user.isMfaActive,
  });
};

export const logout = async (req, res) => {
  if (!req.user)
    res.status(401).json({
      message: "Unauthorized user",
    });
  req.logout((err) => {
    if (err)
      return res.status(400).json({
        message: "user not logged in",
      });
    res.status(200).json({
      message: "Logout successful",
    });
  });
};

export const authStatus = async (req, res) => {
  if (req.user) {
    res.status(200).json({
      message: "User logged in successfully",
      username: req.user.username,
      isMfaActive: req.user.isMfaActive,
    });
  } else {
    res.status(401).json({
      message: "Unauthorized user",
    });
  }
};

export const setup2FA = async (req, res) => {
  try {
    const user = req.user;
    console.log("The req.user is : ", user);
    var secret = speakeasy.generateSecret();
    console.log("The secret object is : ", secret);
    user.twoFactorScecret = secret.base32;
    user.isMfaActive = true;
    await user.save();

    const url = speakeasy.otpauthURL({
      secret: secret.base32,
      label: user.username,
      issuer: "saijami38@gmail.com",
      encoding: "base32",
    });
    const qrImageUrl = await qrcode.toDataURL(url);
    res.status(200).json({
      secret: secret.base32,
      qrCode: qrImageUrl,
    });
  } catch (error) {
    console.error("Error setting up 2FA", error);
    res.status(500).json({
      error: `Error setting up 2FA`,
      message: error,
    });
  }
};
export const verify2FA = async (req, res) => {};
export const reset2FA = async (req, res) => {};
