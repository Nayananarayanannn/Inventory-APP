import { Button, Grid } from '@mui/material';
import React from 'react'
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AdjustmentsTable from '../../../Components/inventory/AdjustmentsTable';

function InventotyAdjustments() {
  return (
    <Grid container sx={{ marginTop: "4vh" }}>
      <Grid xs={2}></Grid>
      <Grid xs={8}>
        <a href="/home/inventory/adjustment-add">
          <Button
            style={{ display: "flex", justifyContent: "flex-end" }}
            variant="contained"
            endIcon={<AddCircleIcon />}
          >
            Create Adjustments
          </Button>
        </a>
        <AdjustmentsTable />
      </Grid>
    </Grid>
  );
}

export default InventotyAdjustments