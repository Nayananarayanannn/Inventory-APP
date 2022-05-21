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
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

function CustomerAdd() {
  const navigate = useNavigate();

  const [err, setErr] = useState();
  const [success, setSuccess] = useState();
  const [customerType, setCustomerType] = useState();
  const [items, setItems] = useState();
  const [itemsPurchased, setItemsPurchased] = useState();

  // form validation function
  const validate = (values) => {
    const errors = {};

    // empty customerName
    if (!values.customerName) {
      errors.customerName = "*Customer Name cannot be empty";
    }

    if (!values.customerAddress) {
      errors.customerAddress = "*Customer Address cannot be empty";
    }

    return errors;
  };

  // form validation states using formik
  const formik = useFormik({
    initialValues: {
      customerName: "",
      customerAddress: "",
      customerType: customerType,
      itemsPurchased: itemsPurchased,
    },
    validate,
  });
  // formik ends here

  //   list items api
  const listItems = () => {
    var config = {
      method: "get",
      url: "/api/item",
    };

    axios(config)
      .then(function (response) {
        setItems(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    listItems();
  });

  // add new group api call
  const addCustomer = () => {
    var data = JSON.stringify({
      customerName: formik.values.customerName,
      customerAddress: formik.values.customerAddress,
      customerType: customerType,
      itemsPurchased: itemsPurchased,
    });

    var config = {
      method: "post",
      url: "/api/customers/add",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        navigate("/home/sales/customers")
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formik.values.customerName) {
      setErr("Fields cannot be empty");
    } else if (Object.entries(formik.errors).length) {
      setErr("Mandatory fields cannot be empty");
    } else {
      addCustomer();
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
              Add New Customer
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
                    autoComplete="customer-name"
                    name="customerName"
                    fullWidth
                    id="customerName"
                    label="New Customer Name"
                    value={formik.values.customerName}
                    onChange={formik.handleChange}
                    autoFocus
                  />
                  {formik.errors.customerName ? (
                    <div className="error">{formik.errors.customerName}</div>
                  ) : null}
                </Grid>

                <Grid item xs={12} style={{ textAlign: "left" }}>
                  <TextField
                    autoComplete="customer-address"
                    name="customerAddress"
                    fullWidth
                    id="customerAddress"
                    label="New Customer Address"
                    value={formik.values.customerAddress}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.customerAddress ? (
                    <div className="error">{formik.errors.customerAddress}</div>
                  ) : null}
                </Grid>

                <Grid item xs={12} style={{ textAlign: "left" }}>
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel id="demo-simple-select-filled-label">
                      Customer Type
                    </InputLabel>
                    <Select
                      style={{ width: "100%" }}
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={customerType}
                      label="Customer Type"
                      onChange={(e) => {
                        setCustomerType(e.target.value);
                      }}
                    >
                      <MenuItem value="Individual">Individual</MenuItem>
                      <MenuItem value="Business">Business</MenuItem>
                    </Select>
                    {formik.errors.customerType ? (
                      <div className="error">
                        {formik.errors.customerType}
                      </div>
                    ) : null}
                  </FormControl>
                </Grid>

                <Grid item xs={12} style={{ textAlign: "left" }}>
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel id="demo-simple-select-filled-label">
                      Items Purchased
                    </InputLabel>
                    <Select
                      style={{ width: "100%" }}
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={itemsPurchased}
                      label="Items Purchased"
                      onChange={(e) => {
                        setItemsPurchased(e.target.value);
                      }}
                    >
                      {items?.map((item) => (
                        <MenuItem value={item.itemName}>{item.itemName}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add New Customer
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

export default CustomerAdd;
