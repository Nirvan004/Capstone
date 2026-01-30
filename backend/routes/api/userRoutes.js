const router = require("express").Router();
const User = require("../../models/User");
const signToken = require("../../utils/token");

router.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = signToken(user);
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(400).json({ message: "Error creating user", error: err });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const correctPw = await user.isCorrectPassword(req.body.password);
    if (!correctPw) return res.status(400).json({ message: "Invalid email or password" });

    const token = signToken(user);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

module.exports = router;