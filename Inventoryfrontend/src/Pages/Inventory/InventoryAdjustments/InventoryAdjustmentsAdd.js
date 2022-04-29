import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, FormLabel, InputAdornment } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

// form validation function
const validate = (values) => {
  const errors = {};

  // empty
  if (!values.id) {
    errors.id = "*Unique Id cannot be empty";
  }
  if (!values.mode) {
    errors.mode = "*Mode of Adjustment cannot be empty";
  }
  if (!values.refNumber) {
    errors.refNumber = "*Reference Number cannot be empty";
  }
  if (!values.date) {
    errors.date = "*Date cannot be empty";
  }
  if (!values.reason) {
    errors.reason = "*Reason cannot be empty";
  }
    if (!values.description) {
      errors.description = "*Description cannot be empty";
    }
  if (!values.details) {
    errors.details = "*Item Details cannot be empty";
  }
  return errors;
};

function InventoryAdjustmentsAdd() {
  const navigate = useNavigate();

  const [err, setErr] = useState();
  const [success, setSuccess] = useState();

  // form validation states using formik
  const formik = useFormik({
    initialValues: {
      id: "",
      mode: "",
      refNumber: "",
      date: "",
      reason: "",
      description: "",
      details: "",
    },
    validate,
  });
  // formik ends here

  // add new adjustment api call
  const addAdjustments = () => {
      var data = JSON.stringify({
        id: formik.values.id,
        mode: formik.values.mode,
        refNumber: formik.values.refNumber,
        date: formik.values.date,
        reason: formik.values.reason,
        description: formik.values.description,
        details: formik.values.details,
      });

      var config = {
        method: "post",
        url: "/api/itemAdjustment/add",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          navigate("/home/inventory/Inventory%20Adjustments");
        })
        .catch(function (error) {
          console.log(error);
          setErr(error.response.data)
        });
  };

  // handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formik.values.id) {
      setErr("Mandatory fields cannot be empty");
    } else if (Object.entries(formik.errors).length) {
      setErr("Mandatory fields cannot be empty");
    }
    else {
      addAdjustments();
    }
  };

  return (
    <div className="addItemWrapper">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* alert on any error */}
            <Alert sx={{ display: err ? "content" : "none" }} severity="error">
              {err}
            </Alert>
            {/* successfully item added */}
            <Alert
              sx={{ display: success ? "content" : "none" }}
              severity="success"
            >
              {success}
            </Alert>

            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <AddBusinessIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add New Adjustments
            </Typography>
            {/* form */}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
              className="signupForm"
            >
              <Grid
                container
                spacing={2}
                style={{ maxHeight: "50vh", overflow: "auto" }}
              >
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="id"
                    name="id"
                    fullWidth
                    id="firstName"
                    label="Unique Id"
                    value={formik.values.id}
                    onChange={formik.handleChange}
                    autoFocus
                  />
                  {formik.errors.id ? (
                    <div className="error">{formik.errors.id}</div>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="mode"
                    name="mode"
                    fullWidth
                    id="mode"
                    label="Mode of Adjustments"
                    value={formik.values.mode}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.mode ? (
                    <div className="error">{formik.errors.mode}</div>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="refNumber"
                    name="refNumber"
                    fullWidth
                    id="refNumber"
                    label="Reference Number"
                    value={formik.values.refNumber}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.refNumber ? (
                    <div className="error">{formik.errors.refNumber}</div>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="date"
                    name="date"
                    fullWidth
                    id="date"
                    label="date"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    type="date"
                  />
                  {formik.errors.date ? (
                    <div className="error">{formik.errors.date}</div>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="reason"
                    name="reason"
                    fullWidth
                    id="reason"
                    label="Reason"
                    value={formik.values.reason}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.reason ? (
                    <div className="error">{formik.errors.reason}</div>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="description"
                    name="description"
                    fullWidth
                    id="description"
                    label="Description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.description ? (
                    <div className="error">{formik.errors.description}</div>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="details"
                    name="details"
                    fullWidth
                    id="details"
                    label="Item Details"
                    value={formik.values.details}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.details ? (
                    <div className="error">{formik.errors.details}</div>
                  ) : null}
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add New Adjustment
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item></Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default InventoryAdjustmentsAdd;
