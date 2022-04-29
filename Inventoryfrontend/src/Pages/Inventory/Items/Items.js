import { Button, Grid } from '@mui/material';
import React from 'react'
import ItemTable from '../../../Components/inventory/ItemTable'
import AddCircleIcon from "@mui/icons-material/AddCircle";

function Items() {
  return (
    <div>
      <Grid container sx={{marginTop:"4vh"}}>
        <Grid xs={2}></Grid>
        <Grid xs={8}>
          <a href='/home/inventory/item-add'>
            <Button
              style={{ display: "flex", justifyContent: "flex-end" }}
              variant="contained"
              endIcon={<AddCircleIcon />}
            >
              Add Item
            </Button>
          </a>
          <ItemTable />
        </Grid>
      </Grid>
    </div>
  );
}

export default Items