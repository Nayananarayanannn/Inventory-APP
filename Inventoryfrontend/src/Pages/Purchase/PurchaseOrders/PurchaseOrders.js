import { Button, Grid } from '@mui/material';
import React from 'react'
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PurchaseTable from '../../../Components/purchase/PurchaseTable';

function PurchaseOrders() {
  return (
    <div>
      <Grid container sx={{ marginTop: "4vh" }}>
        <Grid xs={2}></Grid>
        <Grid xs={8}>
          <a href="/home/purchase/order-add">
            <Button
              style={{ display: "flex", justifyContent: "flex-end" }}
              variant="contained"
              endIcon={<AddCircleIcon />}
            >
              Create Purchase Orders
            </Button>
          </a>
          <PurchaseTable />
        </Grid>
      </Grid>
    </div>
  );
}

export default PurchaseOrders