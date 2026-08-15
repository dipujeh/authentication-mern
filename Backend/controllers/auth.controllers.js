import uploadImageOnCloudinary from "../config/cloudinary.js";
import generateToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, course, email, password } = req.body;

    // console.log(req.body);
    // console.log(req.file);

    // Check Email
    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    // create hash password

    const hashPassword = await bcrypt.hash(password, 10);

    // image upload on cloudinary
    let profileImage;

    if (req.file) {
      profileImage = await uploadImageOnCloudinary(req.file.path);
    }

    // Create User
    const user = await User.create({
      firstName,
      lastName,
      course,
      email,
      password: hashPassword,
      profileImg: profileImage,
    });

    // genrate token
    let token = generateToken(user._id);

    // parse cookie

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "none",
    });

    res.status(201).json({
      message: "Signup Successfully",
      user: { firstName, lastName, course, email, profileImg: profileImage },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server error",
      error: error.message,
    });
  }
};

// Login auth

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const match = await bcrypt.compare(password, existUser.password);

    if (!match) {
      return res.status(400).json({ message: "incorrect password" });
    }

    // genrate token
    let token = generateToken(existUser._id);

    // parse cookie

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "none",
    });

    res.status(200).json({
      message: "Login successfull",
      user: {
        firstName: existUser.firstName,
        lastName: existUser.lastName,
        course: existUser.course,
        email: existUser.email,
        profileImg: existUser.profileImg,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// logout auth

export const logout = (req, res) => {
  try {
    res.clearCookie("token",{
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "none",
    });

    res.status(200).json({
      message: "Logout successfull.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// get data

export const getData = async (req, res) => {
  try {
    const userId = req.userId;
    // console.log(userId);

    if (!userId) {
      return res.status(400).json({ message: "user id is not found" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("getData error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
