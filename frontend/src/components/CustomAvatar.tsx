import React, { useContext, useState, MouseEvent } from "react";
import { Avatar, Typography, useTheme, Popover, Stack } from "@mui/material";
import CustomLogout from "./CustomLogout";
import useAuth from "../hooks/useAuth";

const CustomAvatar: React.FC = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "avatar-popover" : undefined;

  const getInitials = (email: string = "User"): string => {
    return email.charAt(0).toUpperCase();
  };

  return (
    <>
      <Avatar
        sx={{
          width: 40,
          height: 40,
          bgcolor: theme.palette.primary.main,
          fontSize: "1.5rem",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        {getInitials(user?.email || "")}
      </Avatar>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            p: 2,
            borderRadius: 2,
            minWidth: 200,
            boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
          },
        }}
      >
        <Stack spacing={1}>
          <Typography fontWeight="bold" color="primary">
            {user?.email || "user@domain.com"}
          </Typography>
          <CustomLogout />
        </Stack>
      </Popover>
    </>
  );
};

export default CustomAvatar;
