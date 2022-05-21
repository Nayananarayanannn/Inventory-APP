import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState,useEffect } from "react";
import axios from "axios";


export default function VendorTable() {
    const [vendors,setVendors] = useState();

    // list vendors apo call
    const listVendors = () => {
        var config = {
          method: "get",
          url: "/api/vendor",
          headers: {},
        };

        axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            setVendors(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    useEffect(() => {
        listVendors();
    })

  return (
    <TableContainer component={Paper} style={{ marginTop: "2vh" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: "20%" }}>Vendor Name</TableCell>
            <TableCell style={{ width: "20%" }}>Vendor Image</TableCell>
            <TableCell style={{ width: "fit-content" }}>Items</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vendors?.map((vendor) => (
            <TableRow
              key={vendor.vendorName}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {vendor.vendorName}
              </TableCell>
              <TableCell component="th" scope="row">
                <img height="50px" src={vendor.vendorImage} />
              </TableCell>
              <TableCell>
                {vendor.items?.map((item) => (
                  <>⦿ {item.itemName} </>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
