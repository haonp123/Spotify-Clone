import { Message } from "../models/message.model.js";
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

export const getMessages = async (req, res, next) => {
  try {
    const myId = req.user._id;
    const { userId } = req.params;

    console.log(myId, userId);

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userId },
        { senderId: userId, receiverId: myId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};
