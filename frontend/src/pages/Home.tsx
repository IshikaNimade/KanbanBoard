import React, { useState } from "react";
import { Grid, Paper, Avatar, Typography, Stack } from "@mui/material";
import CustomButton from "../components/CustomButton";
import LockIcon from "@mui/icons-material/Lock";
import Signup from "../layouts/SignUp";
import Login from "../layouts/Login";
import CustomAppName from "../components/CustomAppName";

const Home: React.FC = () => {
  const [isSignup, setIsSignup] = useState<boolean>(false);


  return (
    <Grid
      container
      component="main"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Grid
        component={Paper}
        elevation={6}
        sx={{
          width: { xs: "100%", sm: 400 },
          maxWidth: 500,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 2,
        }}
      >
        <CustomAppName />
        <Stack alignItems={"center"} spacing={2} sx={{ width: "100%" }}>
          <Avatar sx={{ bgcolor: "primary.main" }}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isSignup ? "Sign Up" : "Sign In"}
          </Typography>
          {isSignup ? <Signup /> : <Login />}
          <CustomButton
            type="button"
            variant="text"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </CustomButton>

        </Stack>
      </Grid>
    </Grid>
  );
};

export default Home;
