const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const boardRoutes = require("./routes/boardRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/board", boardRoutes);

app.get("/", (req, res) => {
  res.send("Kanban API is running");
});

module.exports = app;
