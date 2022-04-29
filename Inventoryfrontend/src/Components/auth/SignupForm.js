import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import { Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
var axios = require("axios");

const theme = createTheme();

// form validation function
const validate = (values) => {
  const errors = {};
  // empty firstName
  if (!values.firstName) {
    errors.firstName = "*First Name cannot be empty";
  } 
  // firstname is too long
  else if (values.firstName.length > 15) {
    errors.firstName = "*Must be 15 characters or less";
  }

  // empty lastName
  if (!values.lastName) {
    errors.lastName = "*Last Name cannot be empty";
  } 
  // lastName is too long
  else if (values.lastName.length > 20) {
    errors.lastName = "*Must be 20 characters or less";
  }

  // empty email
  if (!values.email) {
    errors.email = "*Email cannot be empty";
  } 
  // email is invalid type
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "*Invalid email address";
  }

  // empty password
  if (!values.password) {
    errors.password = "*Password cannot be empty";
  } 
// password is too short
  else if (values.password.length < 8) {
    errors.password = "*Password is too short";
  } 
  // password is invalid
  else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/.test(
      values.password
    )
  ) {
    errors.password =
      "*Must Contain Lowercase,Uppercase,Numeric,SpecialCharacter";
  }

  return errors;
};

export default function SignupForm() {
  const [err, setErr] = useState("");//error alert state
  const navigate = useNavigate();

  // form validation states using formik
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
  const register = () => {
    // append data
    var data = JSON.stringify({
      firstName: formik.values.firstName,
      lastName: formik.values.lastName,
      email: formik.values.email,
      password: formik.values.password,
    });

    var config = {
      method: "post",
      url: "/api/user",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        navigate("/");
      })
      .catch(function (error) {
        setErr(error.response.data);//error catcher
      });
  };

  // handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    // fields empty
    if (
      !formik.values.firstName ||
      !formik.values.lastName ||
      !formik.values.email ||
      !formik.values.password
    ) {
      setErr("Fields Cannot Be Empty!");
    } 
    // any validation error
    else if (Object.entries(formik.errors).length) {
      setErr("Something Went wrong!");
    } 
    // api call
    else {
      register();
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {/* form */}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
            className="signupForm"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  autoFocus
                />
                {formik.errors.firstName ? (
                  <div className="error">{formik.errors.firstName}</div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                />
                {formik.errors.lastName ? (
                  <div className="error">{formik.errors.lastName}</div>
                ) : null}
              </Grid>
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
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
