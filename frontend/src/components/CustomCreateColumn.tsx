import React, { useState } from "react";
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

interface CustomCreateColumnProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomCreateColumn: React.FC<CustomCreateColumnProps> = ({ openDialog, setOpenDialog }) => {
  const { handleAddColumn } = useKanban();
  const theme = useTheme();

  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleClose = () => {
    setTitle("");
    setErrorMessage("");
    setSuccessMessage("");
    setOpenDialog(false);
  };

  const handleAdd = async () => {
    if (!title.trim()) {
      setErrorMessage("Please enter a column title.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      await handleAddColumn(title.trim());
      setSuccessMessage("Column added successfully!");
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
      open={openDialog}
      onClose={handleClose}
      maxWidth="xs"
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
          Add Column
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Column Title"
            fullWidth
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={Boolean(errorMessage)}
            helperText={errorMessage && "Title cannot be empty."}
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

export default CustomCreateColumn;
