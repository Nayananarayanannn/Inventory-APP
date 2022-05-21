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

function PurchaseTable() {
  const [orders, setOrders] = useState();

  // list vendors apo call
  const listOrders = () => {
    var config = {
      method: "get",
      url: "/api/purchaseOrders",
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setOrders(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    listOrders();
  });

  return (
    <TableContainer component={Paper} style={{ marginTop: "2vh" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Purchase Number</TableCell>
            <TableCell>Item Name</TableCell>
            <TableCell>Unit Purchased</TableCell>
            <TableCell>Payment Mode</TableCell>
            <TableCell>Payment Made</TableCell>
            <TableCell>Purchase Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((order) => (
            <TableRow
              key={order.purchaseNumber}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {order.purchaseNumber}
              </TableCell>
              <TableCell component="th" scope="row">
                {order.itemName}
              </TableCell>
              <TableCell>{order.unit}</TableCell>
              <TableCell>{order.mode}</TableCell>
              <TableCell>{order.price}</TableCell>
              <TableCell>{order.purchaseDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PurchaseTable;
