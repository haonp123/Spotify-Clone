import { jwtDecode } from "jwt-decode";

import { User } from "../models/user.model.js";

export const login = async (req, res, next) => {
  try {
    const { token } = req.body;

    const decoded = jwtDecode(token);

    const { sub, picture, name, email } = decoded;

    // check if user already exists
    let user = await User.findOne({ googleId: sub });

    if (!user) {
      // signup
      user = await User.create({
        googleId: sub,
        fullName: name,
        imageUrl: picture,
        emailAddress: email,
      });
    }

    res.cookie("jwt", token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
    });

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in auth callback", error);
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findOne({ googleId: req.user.googleId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getMe controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
