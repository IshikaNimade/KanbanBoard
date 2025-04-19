import React, { useState } from "react";
import { Stack, Typography, IconButton, Paper, Divider } from "@mui/material";
import { Delete, DragIndicator } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import CustomDeleteDialog from "./CustomDeleteDialog";
import { Task } from "../types/types";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

interface CustomTaskCardProps {
  task: Task;
}

const CustomTaskCard: React.FC<CustomTaskCardProps> = ({ task }) => {
  const theme = useTheme();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleCloseDialog = () => setOpenDeleteDialog(false);
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setOpenDeleteDialog(true);
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task._id });


  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: 16,
  };

  return (
    <>
      <Paper
        sx={{
          padding: 2,
          borderRadius: 2,
          boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
        style={style}
        ref={setNodeRef}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold" color={theme.palette.primary.main}>
            {task.title}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton {...attributes}
              {...listeners}
              sx={{ cursor: "grab" }} >
              <DragIndicator />
            </IconButton>
            <IconButton color="error" onClick={handleDeleteClick}>
              <Delete />
            </IconButton>
          </Stack>
        </Stack>

        <Divider />

        <Typography variant="body1">
          {task.description || "No description available."}
        </Typography>
      </Paper>

      <CustomDeleteDialog open={openDeleteDialog} onCancel={handleCloseDialog} task={task} />
    </>
  );
};

export default CustomTaskCard;
