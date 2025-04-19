import React from "react";
import { Box } from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CustomTaskCard from "./CustomTaskCard";
import { Task } from "../types/types";

interface SortableTaskCardProps {
  task: Task;
  index: number;
}

const SortableTaskCard: React.FC<SortableTaskCardProps> = ({ task }) => {
  return (
    <Box  >
      <CustomTaskCard task={task} />
    </Box>
  );
};

export default SortableTaskCard;
