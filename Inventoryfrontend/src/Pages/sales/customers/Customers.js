import { Button, Grid } from '@mui/material';
import React from 'react'
import AddCircleIcon from "@mui/icons-material/AddCircle";import CustomerTable from '../../../Components/sales/CustomerTable';
;

function Customers() {
  return (
    <div>
      <Grid container sx={{ marginTop: "4vh" }}>
        <Grid xs={2}></Grid>
        <Grid xs={8}>
          <a href="/home/sales/customer-add">
            <Button
              style={{ display: "flex", justifyContent: "flex-end" }}
              variant="contained"
              endIcon={<AddCircleIcon />}
            >
              Add New Customer
            </Button>
          </a>
          <CustomerTable/>
        </Grid>
      </Grid>
    </div>
  );
}

export default Customers