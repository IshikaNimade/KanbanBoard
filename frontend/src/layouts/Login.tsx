import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Alert } from "@mui/material";
import CustomTextField from "../components/CustomTextField";
import CustomButton from "../components/CustomButton";
import { Email as EmailIcon } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";
import { UserData } from "../types/types";
import useAuth from "../hooks/useAuth";
import useKanban from "../hooks/useKanban";

const Login: React.FC = () => {
  const [formData, setFormData] = useState<UserData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const navigate = useNavigate();
  const { login } = useAuth();
  const { fetchBoard } = useKanban();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await login(formData);
      await fetchBoard();
      localStorage.setItem("token", response.token);
      setSuccess("Login successful! Redirecting to dashboard...");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err?.message || "Login failed.");
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
        Sign In
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

export default Login;
