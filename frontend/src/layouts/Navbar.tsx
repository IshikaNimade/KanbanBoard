import { useState } from "react";
import { AppBar, Toolbar, useTheme, Stack, Button } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import CustomAppName from "../components/CustomAppName";
import CustomAvatar from "../components/CustomAvatar";
import CustomCreateColumn from "../components/CustomCreateColumn";

const Navbar: React.FC = () => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpen = () => {
    setOpenDialog(true);
  };

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "#fff",
          color: theme.palette.text.primary,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            px: 2,
            justifyContent: "space-between",
            minHeight: "56px !important",
          }}
        >
          <Stack sx={{ width: 200 }}>
            <CustomAppName />
          </Stack>
          <Stack direction="row" gap={2}>
            <Button
              variant="outlined"
              startIcon={<AddCircleRoundedIcon />}
              onClick={handleOpen}
              sx={{
                fontWeight: "bold",
                borderWidth: "2px",
                alignItems: "center",
              }}
            >
              Create New
            </Button>
            <CustomAvatar />
          </Stack>
        </Toolbar>
      </AppBar>
      <CustomCreateColumn
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </>
  );
};

export default Navbar;
