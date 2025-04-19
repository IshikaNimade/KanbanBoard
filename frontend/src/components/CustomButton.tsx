import React from "react";
import { Button, ButtonProps } from "@mui/material";

interface CustomButtonProps extends ButtonProps {
  type: "button" | "submit" | "reset";
  onClick: () => void;
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  type,
  variant,
  onClick,
  children,
}) => {
  return (
    <Button
      type={type}
      variant={variant}
      fullWidth
      onClick={onClick}
      sx={{ mt: 3, mb: 2 }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
