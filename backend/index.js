const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connect
mongoose
  .connect("mongodb+srv://nayan:nayan123@cluster0.08edqrn.mongodb.net/todoApp")
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(err));

// Schema
const todoSchema = new mongoose.Schema({
  task: String,
  completed: Boolean,
});

// Model
const Todo = mongoose.model("Todo", todoSchema);

// Routes

// GET - All Todos
app.get("/todos", async (req, res) => {
  let todos = await Todo.find();
  res.json(todos);
});

// POST - New Todo
app.post("/todos", async (req, res) => {
  let todo = new Todo({
    task: req.body.task,
    completed: false,
  });
  await todo.save();
  res.json(todo);
});

// DELETE - Remove todo
app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted!" });
});

app.listen(3000, () => console.log("Server running on port 3000"));