import { Button, Grid } from '@mui/material';
import React from 'react'
import VendorTable from '../../../Components/purchase/VendorTable';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CreditsTable from '../../../Components/purchase/CreditsTable';

function VendorCredits() {
  return (
    <div>
      <Grid container sx={{ marginTop: "4vh" }}>
        <Grid xs={2}></Grid>
        <Grid xs={8}>
          <a href="/home/purchase/credits-add">
            <Button
              style={{ display: "flex", justifyContent: "flex-end" }}
              variant="contained"
              endIcon={<AddCircleIcon />}
            >
              Download Credit notes
            </Button>
          </a>
          <CreditsTable />
        </Grid>
      </Grid>
    </div>
  );
}

export default VendorCredits