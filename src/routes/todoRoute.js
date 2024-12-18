import express from "express";
import db from "../db.js";
const router = express.Router();

router.get("/", (req, res) => {
  try {
    const todos = db
      .prepare("SELECT * FROM todos WHERE user_id = ?")
      .all(req.userId);
    res.json(todos);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", (req, res) => {
  try {
    const { title, description } = req.body;
    const todo = db
      .prepare(
        "INSERT INTO todos (title, description, user_id) VALUES (?, ?, ?)"
      )
      .run(title, description, req.userId);
    res.json(todo);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
