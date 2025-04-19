const express = require("express");
const router = express.Router();
const {
  getBoard,
  createColumn,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/boardController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getBoard);
router.post("/column", protect, createColumn);
router.post("/task", protect, createTask);
router.patch("/task/:id", protect, updateTask);
router.delete("/task/:id", protect, deleteTask);

module.exports = router;
