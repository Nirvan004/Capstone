const router = require("express").Router();
const Video = require("../../models/Video");
const authMiddleware = require("../../middleware/authMiddleware");

router.use(authMiddleware);

router.post("/", async (req, res) => {
  try {
    const video = await Video.create({
      ...req.body,
      user: req.user._id,
    });
    res.status(201).json(video);
  } catch (err) {
    res.status(400).json({ message: "Error creating video", error: err });
  }
});

router.get("/", async (req, res) => {
  try {
    const videos = await Video.find({ user: req.user._id });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: "Error fetching videos", error: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const video = await Video.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!video) return res.status(404).json({ message: "Video not found" });
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: "Error fetching video", error: err });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const video = await Video.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!video) return res.status(404).json({ message: "Video not found or not yours" });
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: "Error updating video", error: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const video = await Video.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!video) return res.status(404).json({ message: "Video not found or not yours" });
    res.json({ message: "Video deleted", video });
  } catch (err) {
    res.status(500).json({ message: "Error deleting video", error: err });
  }
});

module.exports = router;