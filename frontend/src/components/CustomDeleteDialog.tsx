import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  DialogContentText,
} from "@mui/material";
import useKanban from "../hooks/useKanban";
import { Task } from "../types/types";

interface CustomDeleteDialogProps {
  open: boolean;
  onCancel: () => void;
  task: Task | null;
}

const CustomDeleteDialog: React.FC<CustomDeleteDialogProps> = ({
  open,
  onCancel,
  task,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { handleDeleteTask } = useKanban();

  const confirmDelete = async () => {
    if (!task) return;
    setLoading(true);
    try {
      await handleDeleteTask(task._id);
      onCancel();
    } catch (error) {
      console.error("Failed to delete task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle color="error" fontWeight={"bold"}>
        Confirm Deletion
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the task{" "}
          <strong>{task?.title}</strong>? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="error" variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={confirmDelete}
          color="error"
          variant="contained"
          disabled={loading}
        >
          {loading ? "Deleting..." : "Yes, Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDeleteDialog;
