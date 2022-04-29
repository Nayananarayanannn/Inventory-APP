import React, { useState } from "react";
import {
  Card,
  Grid,
  styled,
  Typography,
  useMediaQuery,
} from "@mui/material";
import LoginForm from "../../Components/auth/LoginForm";

function Login() {

  const SectionStyle = styled(Card)(({ theme }) => ({
    width: "100%",
    maxWidth: 464,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: theme.spacing(2, 0, 2, 12),
    boxShadow: "10px 10px 20px rgba(0,0,0,0.5)",
  }));
  const matches = useMediaQuery("(max-width:900px)");

  return (
    <Grid style={{ marginTop: "8vh" }} container spacing={2}>
      <Grid item md={6} sx={{ display: matches ? "none" : "flex" }}>
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Welcome Back ...
          </Typography>
          <img alt="register" src="/illustration_login.png" />
        </SectionStyle>
      </Grid>
      <Grid item sx={{ width: "100%" }} md={6}>
        <LoginForm />
      </Grid>
    </Grid>
  );
}

export default Login;
