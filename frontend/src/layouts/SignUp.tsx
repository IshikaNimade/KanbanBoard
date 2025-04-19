import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Alert } from "@mui/material";
import CustomTextField from "../components/CustomTextField";
import CustomButton from "../components/CustomButton";
import { Email as EmailIcon } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";
import { UserData } from "../types/types";
import useAuth from "../hooks/useAuth";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<UserData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const navigate = useNavigate();
  const authContext = useAuth();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      await authContext.register(formData);
      setSuccess("Registration successful! Redirecting to authentication...");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
      <CustomTextField
        label="Email Address"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        icon={<EmailIcon />}
      />
      <CustomTextField
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        icon={<LockIcon />}
      />
      <CustomButton type="submit" variant="contained" onClick={() => { }}>
        Sign Up
      </CustomButton>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
    </Box>
  );
};

export default Signup;
