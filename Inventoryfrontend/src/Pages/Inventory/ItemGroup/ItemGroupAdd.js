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

  // empty itemName
  if (!values.groupName) {
    errors.itemName = "*Group Name cannot be empty";
  }

  return errors;
};

function ItemGroupAdd() {
  const navigate = useNavigate();

  const [err, setErr] = useState();
  const [success, setSuccess] = useState();
  const [pic, setPic] = useState();

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
      groupName: "",
      groupImage:pic
    },
    validate,
  });
  // formik ends here

  // add new group api call
  const addGroup = () => {
      var data = JSON.stringify({
        groupName: formik.values.groupName,
        groupImage: pic
      });

      var config = {
        method: "post",
        url: "/api/itemGroup/add",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          setSuccess("New Group Added");
          setTimeout(navigate("/home/inventory/item%20Groups"), 3000);
        })
        .catch(function (error) {
          console.log(error);
          setErr(error.response.data);
        });
  };

  // handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formik.values.groupName) {
      setErr("Mandatory fields cannot be empty");
    } 
    else {
      addGroup();
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
              Add New Group
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
                    autoComplete="group-name"
                    name="groupName"
                    fullWidth
                    id="firstName"
                    label="New Group Name"
                    value={formik.values.groupName}
                    onChange={formik.handleChange}
                    autoFocus
                  />
                  {formik.errors.groupName ? (
                    <div className="error">{formik.errors.groupName}</div>
                  ) : null}
                </Grid>
                
                <Grid item xs={12} style={{ textAlign: "left" }}>
                  <FormLabel>Group Image</FormLabel>
                  <TextField
                    fullWidth
                    name="groupImage"
                    placeholder="Group Image"
                    type="file"
                    onChange={(e) => postDetails(e.target.files[0])}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add New Group
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default ItemGroupAdd;
