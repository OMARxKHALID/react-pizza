import User from "../models/userModel.js";

const setUser = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Name is required" });
    }

    const newUser = new User({ username });
    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create user", details: error.message });
  }
};

const getUserById = async (req, res) => {
  const { _id } = req.params;
  try {
    const user = await User.findById(_id);
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to find user", details: error.message });
  }
};

export { setUser, getUserById };
