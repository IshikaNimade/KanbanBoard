import React from "react";
import { Stack } from "@mui/material";
import logo from "../assets/logo.jpg";

const CustomAppName: React.FC = () => {
  return (
    <Stack alignItems="center">
      <img
        src={logo}
        alt="Kanban Logo"
        style={{ width: "100%", objectFit: "contain" }}
      />
    </Stack>
  );
};

export default CustomAppName;
