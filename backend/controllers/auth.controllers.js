import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/genToken.js";
import cloudinary from "../lib/cloudinary.js"


export const signup = async (req, res) => {
  try {
    let { fullName, email, password } = req.body;
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Your Password must be at least 6 characters" });
    }
    let user = await userModel.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    let newUser = new user({
      fullName,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    generateToken(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.log("error in signup", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body; // this code will extract data from web page input area like what user puts in email and password area

    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword)
      return res.status(400).json({ message: "Invalid Credentials" });

    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("error in login", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("jwt","",{maxAge:0,httpOnly: true});
    res.status(200).json({message:"Logged Out Succesfully"})
  } catch (error) {
    console.log("error in Logging Out", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const updateProfile= async(req,res,next)=>{
  try {
    const {profilePic}= req.body;
    const userId= req.user._id;
    if (!profilePic) return res.status(400).josn({message:"No profile available"});

    const uploadResponse= await cloudinary.uploader.upload(profilePic);
    const updatedUser= await User.findByIdAndUpdate(
      userId,
      {profilePic: uploadResponse.secure_url},
      {new:true}
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in profile Pic:",error)
    res.status(500).json({message:"Internal Server Error"})
  }
}
export const checkAuth = (req,res)=>{
  try {
      res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checking Authrization:",error.message)
    res.status(500).json({message:"Internal Server Error"})
  }
}
