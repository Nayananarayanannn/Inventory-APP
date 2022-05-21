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
import { Alert, FormControl, FormLabel, InputLabel, MenuItem, Select } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

function PurchaseOrdersAdd() {
  const navigate = useNavigate();

  const [err, setErr] = useState();
  const [success, setSuccess] = useState();
  const [itemName, setItemName] = useState();
  const [items, setItems] = useState();

  // form validation function
  const validate = (values) => {
    const errors = {};

    // empty itemName
    if (!values.purchaseNumber) {
      errors.purchaseNumber = "*Purchase Number cannot be empty";
    }

    //   empty itemname
    if (!itemName) {
      errors.itemName = "*Item Name cannot be empty";
    }

    // empty unit
    if (!values.unit) {
      errors.unit = "*Unit to purchase cannot be empty";
    }

    // empty mode
    if (!values.mode) {
      errors.mode = "*Payment mode cannot be empty";
    }

    // empty price
    if (!values.price) {
      errors.price = "*Payment made cannot be empty";
    }

    // empty date
    if (!values.purchaseDate) {
      errors.purchaseDate = "Purchase date cannot be empty";
    }

    return errors;
  };

  // form validation states using formik
  const formik = useFormik({
    initialValues: {
      purchaseNumber: "",
      itemName: itemName,
      unit: "",
      mode: "",
      price: "",
      purchaseDate: "",
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
        console.log(JSON.stringify(response.data));
        setItems(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    listItems();
  }, []);
  // add new order api call
  const addOrder = () => {
    var data = JSON.stringify({
      purchaseNumber: formik.values.purchaseNumber,
      itemName:itemName,
      unit: formik.values.unit,
      mode: formik.values.mode,
      price: formik.values.price,
      purchaseDate: formik.values.purchaseDate,
    });

    var config = {
      method: "post",
      url: "/api/purchaseOrders/add",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setTimeout(navigate("/home/purchase/Purchase%20Orders"), 3000);
      })
      .catch(function (error) {
        console.log(error);
        setErr(error.response.data);
      });
  };

  // handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(itemName)
    if (Object.entries(formik.errors).length) {
      setErr("Mandatory fields cannot be empty");
    } else {
      addOrder();
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
              Create PurchaseOrders
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
                    autoComplete="purchase-number"
                    name="purchaseNumber"
                    fullWidth
                    id="purchaseNumber"
                    label="Purchase Order Number"
                    value={formik.values.purchaseNumber}
                    onChange={formik.handleChange}
                    autoFocus
                  />
                  {formik.errors.purchaseNumber ? (
                    <div className="error">{formik.errors.purchaseNumber}</div>
                  ) : null}
                </Grid>

                <Grid item xs={12} sm={12}>
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel id="demo-simple-select-filled-label">
                      Item Name
                    </InputLabel>
                    <Select
                      style={{ width: "100%" }}
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={itemName}
                      label="Item"
                      onChange={(e) => {
                        setItemName(e.target.value);
                      }}
                    >
                      {items?.map((item) => (
                        <MenuItem value={item.itemName}>
                          {item.itemName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {formik.errors.itemName ? (
                    <div className="error">{formik.errors.itemName}</div>
                  ) : null}
                </Grid>

                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="purchased-unit"
                    name="unit"
                    fullWidth
                    id="unit"
                    label="Unit to purchase"
                    value={formik.values.unit}
                    onChange={formik.handleChange}
                    autoFocus
                  />
                  {formik.errors.unit ? (
                    <div className="error">{formik.errors.unit}</div>
                  ) : null}
                </Grid>

                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="payment-mode"
                    name="mode"
                    fullWidth
                    id="mode"
                    label="Payment Mode"
                    value={formik.values.mode}
                    onChange={formik.handleChange}
                    autoFocus
                  />
                  {formik.errors.mode ? (
                    <div className="error">{formik.errors.mode}</div>
                  ) : null}
                </Grid>

                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="price"
                    name="price"
                    fullWidth
                    id="price"
                    label="Payment Made"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    autoFocus
                  />
                  {formik.errors.price ? (
                    <div className="error">{formik.errors.price}</div>
                  ) : null}
                </Grid>

                <Grid item xs={12} sm={12} textAlign={"left"}>
                  <FormLabel>Purchase Date</FormLabel>
                  <TextField
                    autoComplete="purchase date"
                    name="purchaseDate"
                    fullWidth
                    id="purchaseDate"
                    value={formik.values.purchaseDate}
                    onChange={formik.handleChange}
                    type="date"
                    autoFocus
                  />
                  {formik.errors.purchaseDate ? (
                    <div className="error">{formik.errors.purchaseDate}</div>
                  ) : null}
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add New Purchase Orders
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

export default PurchaseOrdersAdd;
