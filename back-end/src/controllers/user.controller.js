import { User } from "../models/user.model.js";

// get all users except me
export const getAllUsers = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const users = await User.find({ googleId: { $ne: currentUser.googleId } });

    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};
