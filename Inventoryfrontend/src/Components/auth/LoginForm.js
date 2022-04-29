import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import { Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "*Email cannot be empty";
  }

  if (!values.password) {
    errors.password = "*Password cannot be empty";
  }

  return errors;
};

export default function LoginForm() {
  const [err,setErr] = useState("");

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validate,
  });

  // api call
  const login = () => {
    var data = JSON.stringify({
      email: formik.values.email,
      password: formik.values.password,
    });

    var config = {
      method: "post",
      url: "/api/user/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        // save logged in user data in localstorage
        localStorage.setItem("userInfo", JSON.stringify(response.data))
        navigate('/home')
      })
      .catch(function (error) {
        console.log(error);
        setErr('Invalid Email-Id or Password')
      });
  }
  // handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    // fields empty
    if (
      !formik.values.email ||
      !formik.values.password
    ) {
      setErr("Fields Cannot Be Empty!");
    }
    // api call
    else {
      login();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {/* alert on any error */}
      <Alert sx={{ display: err ? "content" : "none" }} severity="error">
        {err}
      </Alert>

      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOpenOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
            className="signupForm"
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.errors.email ? (
                  <div className="error">{formik.errors.email}</div>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                {formik.errors.password ? (
                  <div className="error">{formik.errors.password}</div>
                ) : null}
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href="/register"
                  variant="body2"
                >
                  New Here? Register Now
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
