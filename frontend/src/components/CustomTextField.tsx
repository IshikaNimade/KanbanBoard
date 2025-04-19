import React from "react";
import { TextField, InputAdornment } from "@mui/material";

interface CustomTextFieldProps {
  label: string;
  type: string;
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  icon?: React.ReactNode;
  name: string;
  select?: boolean;
  children?: React.ReactNode;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  type,
  value,
  onChange,
  icon,
  name,
  select,
  children,
}) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      label={label}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      select={select}
      InputProps={{
        startAdornment: icon && <InputAdornment position="start">{icon}</InputAdornment>,
      }}
    >
      {select && children}
    </TextField>
  );
};

export default CustomTextField;
