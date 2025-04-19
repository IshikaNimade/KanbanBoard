import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import useKanban from "../hooks/useKanban";

interface CustomAddTaskDialogProps {
  open: boolean;
  onClose: () => void;
  columnId: string;
}

const CustomAddTaskDialog: React.FC<CustomAddTaskDialogProps> = ({
  open,
  onClose,
  columnId,
}) => {
  const theme = useTheme();
  const { handleAddTask } = useKanban();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    if (title.trim()) {
      setErrorMessage("");
    }
  }, [title]);

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setErrorMessage("");
    setSuccessMessage("");
    onClose();
  };

  const handleAdd = async () => {
    if (!title.trim()) {
      setErrorMessage("Please enter a task title.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      await handleAddTask(columnId, {
        title: title.trim(),
        description: description.trim(),
      });
      setSuccessMessage("Task added successfully!");
      setTimeout(() => {
        handleClose();
        setLoading(false);
      }, 1000);
    } catch (err) {
      setLoading(false);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "12px",
          padding: 2,
        },
      }}
    >
      <DialogTitle>
        <Typography
          variant="h5"
          fontWeight="bold"
          color={theme.palette.primary.main}
        >
          Add Task
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Task Title"
            fullWidth
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={Boolean(errorMessage)}
            helperText={errorMessage || ""}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          color="primary"
          sx={{ textTransform: "none" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleAdd}
          variant="contained"
          color="primary"
          disabled={loading || !title.trim()}
          sx={{ textTransform: "none" }}
        >
          {loading ? (
            <CircularProgress size={20} sx={{ color: "white" }} />
          ) : (
            "Add"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomAddTaskDialog;
