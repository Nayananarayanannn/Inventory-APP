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
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

const theme = createTheme();


function VendorCreditAdd() {
  const navigate = useNavigate();

  const [vendorName, setVendorName] = useState();
  const [refNumber, setRefNumber] = useState();
  const [itemName, setItemName] = useState();
  const [unit, setUnit] = useState();
  const [price, setPrice] = useState();
  const [err, setErr] = useState();
  const [success, setSuccess] = useState();
  const [vendors, setVendors] = useState();
  const [items,setItems] = useState();
  const [itemDetails,setItemDetails] = useState();

  // list vendors apo call
  const listVendors = () => {
    var config = {
      method: "get",
      url: "/api/vendor",
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setVendors(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
      listVendors();
      listItems();
  },[])

  // add new credit api call
  const addCredits = () => {
    var data = JSON.stringify({
      vendorName: vendorName,
      refNumber: refNumber,
      unit: unit,
      itemName: itemName,
      price: price,
    });

    var config = {
      method: "post",
      url: "/api/vendorCredits/add",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

  };

  //   jspdf generate pdf data starts here...
  const generatePDF = () => {
    var doc = new jsPDF("p", "pt");

    doc.setFontSize(50).text(100, 50, "Vendor Credit");
    doc.setTextColor(0, 100, 100).setFontSize(20).text(20, 100, "ProManage");
    doc.setTextColor(0, 0, 0).setFontSize(15);
    doc.line(15, 125, 550, 125);
    doc.text("Vendor Name :", 50, 200).setFont(undefined, "bold");
    doc.text(`${vendorName}`, 300, 200).setFont(undefined, "normal");

    doc.text("Reference No. :", 50, 250).setFont(undefined, "bold");
    doc.text(`${refNumber}`, 300, 250).setFont(undefined, "normal");

    doc.text("Item Name :", 50, 300).setFont(undefined, "bold");
    doc.text(`${itemName}`, 300, 300).setFont(undefined, "normal");

    doc.text("Unit :", 50, 350).setFont(undefined, "bold");
    doc.text(`${unit}`, 300, 350).setFont(undefined, "normal");

    doc.text("Payment Made :", 50, 400).setFont(undefined, "bold");
    doc.text(`${price}`, 300, 400).setFont(undefined, "normal");

    doc.line(15, 425, 550, 425);

    doc.text(`Authorized Signature`, 50, 480).setFont(undefined, "normal");
    doc.line(15, 500, 150, 500);

    doc
      .setFontSize(8)
      .text(`Payment is due within 30 days.`, 50, 515)
      .setFont(undefined, "normal");
    doc.text(`Payable to:`, 50, 525).setFont(undefined, "normal");
    doc.text(`ProManage`, 50, 535).setFont(undefined, "normal");

    doc.line(15, 555, 550, 550);
    doc.save("Credit.pdf");
  };
  //   jspdf generate pdf data ends here...

  // handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    addCredits();
    generatePDF();
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
              Create Vendor Credit
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
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel id="demo-simple-select-filled-label">
                      Vendor Name
                    </InputLabel>
                    <Select
                      style={{ width: "100%" }}
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={vendorName}
                      label="Vendor"
                      onChange={(e) => {
                        setVendorName(e.target.value);
                      }}
                    >
                      {vendors?.map((vendor) => (
                        <MenuItem value={vendor.vendorName}>
                          {vendor.vendorName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} style={{ textAlign: "left" }}>
                  <TextField
                    autoComplete="refNumber"
                    name="refNumber"
                    fullWidth
                    id="refNumber"
                    label="Reference Number"
                    value={refNumber}
                    onChange={(e) => {
                      setRefNumber(e.target.value);
                    }}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} style={{ textAlign: "left" }}>
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
                </Grid>
                <Grid item xs={12} style={{ textAlign: "left" }}>
                  <TextField
                    autoComplete="unit"
                    name="unit"
                    fullWidth
                    id="unit"
                    label="Unit"
                    value={unit}
                    onChange={(e) => {
                      setUnit(e.target.value);
                    }}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} style={{ textAlign: "left" }}>
                  <TextField
                    autoComplete="price"
                    name="price"
                    fullWidth
                    id="price"
                    label="Payment Made"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                    autoFocus
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                download Credit Notes
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

export default VendorCreditAdd;
