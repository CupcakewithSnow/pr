// Configuration
import express from "express";
import authRoutes from "./routes/authRoute.js";
import todoRoutes from "./routes/todoRoute.js";
import authMiddleware from "./middleware/authMiddleware.js";
// Constants
const PORT = process.env.PORT || 3012;

// Create Express application
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!!",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Routes
app.get("/", (req, res) => {
  try {
    res.json({
      message: "Hello World !",
      status: "success",
    });
  } catch (error) {
    next(error);
  }
});

app.use("/auth", authRoutes);
app.use("/todos", authMiddleware, todoRoutes);

// Start server
const startServer = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
