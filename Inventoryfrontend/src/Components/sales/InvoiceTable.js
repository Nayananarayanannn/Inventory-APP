import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function InvoiceTable() {
  const [customers, setCustomers] = useState();

  const listCustomers = () => {
    var config = {
      method: "get",
      url: "/api/customers",
      headers: {},
    };

    axios(config)
      .then(function (response) {
        setCustomers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    listCustomers();
  });
  return (
    <TableContainer component={Paper} style={{ marginTop: "2vh" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: "20%" }}>Date</TableCell>
            <TableCell style={{ width: "20%" }}>Invoice #</TableCell>
            <TableCell style={{ width: "fit-content" }}>
              Customer Name
            </TableCell>
            <TableCell style={{ width: "fit-content" }}>Item Name</TableCell>
            <TableCell style={{ width: "fit-content" }}>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers?.map((customer) => (
            <TableRow
              key={customer.customerName}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {customer.customerName}
              </TableCell>
              <TableCell component="th" scope="row">
                {customer.customerType}
              </TableCell>
              <TableCell component="th" scope="row">
                {customer.customerAddress}
              </TableCell>
              <TableCell component="th" scope="row">
                {customer.itemsPurchased}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default InvoiceTable;
