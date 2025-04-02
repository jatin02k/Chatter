import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose'

export const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ message: "Unauthorized login" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });

    const user = mongoose.Types.ObjectId.isValid(decoded.userId)
  ? await userModel.findById(decoded.userId).select("-password")
  : null;
    if (!user) return res.status(404).json({ message: "User not Found" });
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in Authorization", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
