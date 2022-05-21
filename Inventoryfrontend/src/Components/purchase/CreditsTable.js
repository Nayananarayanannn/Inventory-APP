import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function CreditsTable() {
    const [credits, setCredits] = useState();

    const addCredits = () =>{
        var config = {
  method: 'get',
  url: '/api/vendorCredits',
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  setCredits(response.data)
})
.catch(function (error) {
  console.log(error);
});
    }

    useEffect(() => {
        addCredits();
    },[])

    
  return (
    <TableContainer component={Paper} style={{ marginTop: "2vh" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: "fit-content" }}>Vendor Name</TableCell>
            <TableCell style={{ width: "fit-content" }}>
              Reference Number
            </TableCell>
            <TableCell style={{ width: "fit-content" }}>Item name</TableCell>
            <TableCell style={{ width: "fit-content" }}>Unit</TableCell>
            <TableCell style={{ width: "fit-content" }}>Payment made</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {credits?.map((vendor) => (
            <TableRow
              key={vendor.vendorName}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {vendor.vendorName}
              </TableCell>
              <TableCell component="th" scope="row">
                {vendor.refNumber}
              </TableCell>
              <TableCell component="th" scope="row">
                {vendor.itemName}
              </TableCell>
              <TableCell>{vendor.unit}</TableCell>
              <TableCell>{vendor.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CreditsTable