const router = require("express").Router();
const Todo = require("../../models/Todo");
const Video = require("../../models/Video");
const authMiddleware = require("../../middleware/authMiddleware");

router.use(authMiddleware);

router.post("/videos/:videoId/todos", async (req, res) => {
  try {
    const video = await Video.findOne({
      _id: req.params.videoId,
      user: req.user._id,
    });
    if (!video) return res.status(404).json({ message: "Video not found or not yours" });

    const todo = await Todo.create({
      ...req.body,
      video: video._id,
    });

    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ message: "Error creating todo", error: err });
  }
});

router.get("/videos/:videoId/todos", async (req, res) => {
  try {
    const video = await Video.findOne({
      _id: req.params.videoId,
      user: req.user._id,
    });
    if (!video) return res.status(404).json({ message: "Video not found or not yours" });

    const todos = await Todo.find({ video: video._id });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Error fetching todos", error: err });
  }
});

router.put("/todos/:todoId", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.todoId);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    const video = await Video.findOne({
      _id: todo.video,
      user: req.user._id,
    });
    if (!video) return res.status(403).json({ message: "Not authorized to update this todo" });

    const updatedTodo = await Todo.findByIdAndUpdate(req.params.todoId, req.body, { new: true });
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: "Error updating todo", error: err });
  }
});

router.delete("/todos/:todoId", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.todoId);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    const video = await Video.findOne({
      _id: todo.video,
      user: req.user._id,
    });
    if (!video) return res.status(403).json({ message: "Not authorized to delete this todo" });

    await todo.deleteOne();
    res.json({ message: "Todo deleted", todo });
  } catch (err) {
    res.status(500).json({ message: "Error deleting todo", error: err });
  }
});

module.exports = router;