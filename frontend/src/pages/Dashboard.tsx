import React from "react";
import { Box } from "@mui/material";
import Navbar from "../layouts/Navbar";
import KanbanBoard from "../layouts/KanbanBoard";

const Dashboard: React.FC = () => {
  return (
    <Box>
      <Navbar />
      <KanbanBoard />
    </Box>
  );
};

export default Dashboard;
