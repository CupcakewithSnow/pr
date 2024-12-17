import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import db from "../db.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = db
      .prepare("INSERT INTO users (username, password) VALUES (?, ?)")
      .run(username, hashedPassword);

    const token = jwt.sign(
      { id: result.lastInsertRowid },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
