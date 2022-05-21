import { Button, Grid } from '@mui/material';
import React from 'react'
import AddCircleIcon from "@mui/icons-material/AddCircle";
import VendorTable from '../../../Components/purchase/VendorTable';

function Vendors() {
  return (
    <div>
      <Grid container sx={{ marginTop: "4vh" }}>
        <Grid xs={2}></Grid>
        <Grid xs={8}>
          <a href="/home/purchase/vendor-add">
            <Button
              style={{ display: "flex", justifyContent: "flex-end" }}
              variant="contained"
              endIcon={<AddCircleIcon />}
            >
              Add Vendor
            </Button>
          </a>
          <VendorTable />
        </Grid>
      </Grid>
    </div>
  );
}

export default Vendors