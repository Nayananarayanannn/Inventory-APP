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
import { Alert, FormControl, FormLabel, InputAdornment, InputLabel, MenuItem, Select } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

  // form validation function
  const validate = (values) => {
    const errors = {};
    // empty id
    if (!values.id) {
      errors.id = "*Id cannot be empty";
    }
    // empty itemName
    if (!values.itemName) {
      errors.itemName = "*Item Name cannot be empty";
    }

    if (!values.unit) {
      errors.unit = "*Unit cannot be empty";
    }

    if (!values.sellingPrice) {
      errors.sellingPrice = "*Selling Price cannot be empty";
    }

    if (!values.costPrice) {
      errors.costPrice = "*Cost Price cannot be empty";
    }

    if (!values.openingStock) {
      errors.openingStock = "*Opening Stock cannot be empty";
    }

    if (!values.reorderPoint) {
      errors.reorderPoint = "*Reorder Point cannot be empty";
    }

    return errors;
  };

function ItemAdd() {
  const navigate = useNavigate();

  const [err, setErr] = useState();
  const [success, setSuccess] = useState();
  const [pic, setPic] = useState();
  const [group, setGroup] = useState();
  const [groups, setGroups] = useState();
  const [vendors,setVendors] = useState();
  const [vendor,setVendor] = useState();

  // fetch all groups api
  const listGroups = () => {
    var config = {
      method: "get",
      url: "/api/itemGroup",
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setGroups(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
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
  useEffect(() => {
    listGroups();
    listVendors();
  }, []);

  // post profile picture
  const postDetails = (pics) => {
    // if no pic added, show warning
    if (pics === undefined) {
      setErr("Please Select an image");
      return;
    }

    // add pic only of prefered image formats
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-wall"); //name of app specified in cloudinary
      data.append("cloud_name", "nayananarayanan"); //user name from cloudinary

      // post uploaded image to cloudinary
      fetch("https://api.cloudinary.com/v1_1/nayananarayanan/image/upload", {
        //api url from cloudinary
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // if files are not prefered image formats
    else {
      setErr("Only image files allowed");
    }
  };

  // form validation states using formik
  const formik = useFormik({
    initialValues: {
      id: "",
      itemName: "",
      unit: "",
      weight: "",
      height: "",
      width: "",
      manufacturer: "",
      group: "",
      brand: "",
      sellingPrice: "",
      costPrice: "",
      openingStock: "",
      reorderPoint: "",
      vendor: "",
      description: "",
      image: pic,
    },
    validate,
  });
  // formik ends here

  // add item api call
  const addItem = () => {
    var data = JSON.stringify({
      id: formik.values.id,
      itemName: formik.values.itemName,
      unit: formik.values.unit,
      weight: formik.values.weight,
      height: formik.values.height,
      width: formik.values.width,
      manufacturer: formik.values.manufacturer,
      group: group,
      brand: formik.values.brand,
      sellingPrice: formik.values.sellingPrice,
      costPrice: formik.values.costPrice,
      openingStock: formik.values.openingStock,
      reorderPoint: formik.values.reorderPoint,
      vendor: vendor,
      description: formik.values.description,
      image: pic,
    });

    var config = {
      method: "post",
      url: "/api/item/add",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        listGroups();
        listVendors();
        setSuccess("New item Successfully Added");
        setTimeout(navigate("/home/inventory/items"), 3000);
      })
      .catch(function (error) {
        console.log(error);
        setErr(error.response.data);
      });
  };

  // handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!group) {
      setErr("Group field cannot be empty");
    } else if (!vendor) {
      setErr("Vendor field cannot be empty")
    }
     else if (Object.entries(formik.errors).length) {
      setErr("Mandatory fields cannot be empty");
    } else {
      addItem();
    }
  };

  const handleGroupChange = (event) => {
    setGroup(event.target.value);
  };

  const handleVendorChange = (event) => {
    setVendor(event.target.value);
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
              Add Item
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
                    autoComplete="given-name"
                    name="itemName"
                    fullWidth
                    id="firstName"
                    label="Item Name"
                    value={formik.values.itemName}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.itemName ? (
                    <div className="error">{formik.errors.itemName}</div>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="lastName"
                    label="Unit"
                    name="unit"
                    autoComplete="number"
                    value={formik.values.unit}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.unit ? (
                    <div className="error">{formik.errors.unit}</div>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="email"
                    label="Item Weight"
                    name="weight"
                    autoComplete="weight"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">g</InputAdornment>
                      ),
                    }}
                    value={formik.values.weight}
                    onChange={formik.handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name="height"
                    label="Item Height"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">cm</InputAdornment>
                      ),
                    }}
                    value={formik.values.height}
                    onChange={formik.handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name="width"
                    label="Item Width"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">cm</InputAdornment>
                      ),
                    }}
                    value={formik.values.width}
                    onChange={formik.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="manufacturer"
                    label="Manufacturer"
                    value={formik.values.manufacturer}
                    onChange={formik.handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel id="demo-simple-select-filled-label">
                      Group
                    </InputLabel>
                    <Select
                      style={{ width: "100%" }}
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={group}
                      label="Group"
                      onChange={handleGroupChange}
                    >
                      {groups?.map((group) => (
                        <MenuItem value={group.groupName}>
                          {group.groupName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {formik.errors.group ? (
                    <div className="error">{formik.errors.group}</div>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name="brand"
                    value={formik.values.brand}
                    onChange={formik.handleChange}
                    label="Brand"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name="sellingPrice"
                    label="Selling Price"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    value={formik.values.sellingPrice}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.sellingPrice ? (
                    <div className="error">{formik.errors.sellingPrice}</div>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name="costPrice"
                    label="Cost Price"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    value={formik.values.costPrice}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.costPrice ? (
                    <div className="error">{formik.errors.costPrice}</div>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name="openingStock"
                    label="Opening Stock"
                    type="number"
                    value={formik.values.openingStock}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.openingStock ? (
                    <div className="error">{formik.errors.openingStock}</div>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name="reorderPoint"
                    label="Reorder Point"
                    type="number"
                    value={formik.values.reorderPoint}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.reorderPoint ? (
                    <div className="error">{formik.errors.reorderPoint}</div>
                  ) : null}
                </Grid>
                <Grid item xs={12}>
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel id="demo-simple-select-filled-label">
                      Vendor
                    </InputLabel>
                    <Select
                      style={{ width: "100%" }}
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={vendor}
                      label="Vendor"
                      onChange={handleVendorChange}
                    >
                      {vendors?.map((vendor) => (
                        <MenuItem value={vendor.vendorName}>
                          {vendor.vendorName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    multiline
                    fullWidth
                    name="description"
                    minRows={3}
                    style={{ width: "100%" }}
                    label="Item Description"
                    placeholder="Item description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                  />
                </Grid>
                <Grid item xs={12} style={{ textAlign: "left" }}>
                  <FormLabel>Item Image</FormLabel>
                  <TextField
                    fullWidth
                    name="image"
                    placeholder="Item Image"
                    type="file"
                    onChange={(e) => postDetails(e.target.files[0])}
                  />
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
                Add Item
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  {/* <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link> */}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default ItemAdd;
