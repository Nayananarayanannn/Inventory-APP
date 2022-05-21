import { Button, Grid } from "@mui/material";
import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CustomerTable from "../../../Components/sales/CustomerTable";
import InvoiceTable from "../../../Components/sales/InvoiceTable";

function Invoices() {
  return (
    <div>
      <Grid container sx={{ marginTop: "4vh" }}>
        <Grid xs={2}></Grid>
        <Grid xs={8}>
          <a href="/home/sales/invoices-add">
            <Button
              style={{ display: "flex", justifyContent: "flex-end" }}
              variant="contained"
              endIcon={<AddCircleIcon />}
            >
              New Invoice
            </Button>
          </a>
          <InvoiceTable />
        </Grid>
      </Grid>
    </div>
  );
}

export default Invoices;
