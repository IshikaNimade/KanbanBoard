const Board = require("../models/Board");
const Column = require("../models/Column");
const Task = require("../models/Task");

const getBoard = async (req, res) => {
  try {
    let board = await Board.findOne({ user: req.user._id });
    if (!board) {
      board = await Board.create({ user: req.user._id });
    }

    const columns = await Column.find({ board: board._id }).sort("order");
    const columnIds = columns.map((col) => col._id);
    const tasks = await Task.find({ column: { $in: columnIds } }).sort("order");

    res.json({ board, columns, tasks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createColumn = async (req, res) => {
  const { title } = req.body;
  try {
    const board = await Board.findOne({ user: req.user._id });
    const column = await Column.create({ board: board._id, title });
    res.status(201).json(column);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createTask = async (req, res) => {
  const { column, title, description } = req.body;
  try {
    const task = await Task.create({
      column: column,
      title: title,
      description: description,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTask = async (req, res) => {
  const { columnId, order } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { column: columnId, order: order },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getBoard,
  createColumn,
  createTask,
  updateTask,
  deleteTask,
};
