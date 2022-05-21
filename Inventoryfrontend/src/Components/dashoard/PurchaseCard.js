import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function PurchaseCard() {
    const [ orders, setOrders ] = useState();

      const listOrders = () => {
        var config = {
          method: "get",
          url: "/api/purchaseOrders",
          headers: {},
        };

        axios(config)
          .then(function (response) {
            setOrders(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      };

      useEffect(() => {
          listOrders();
      },[])

  return (
    <Box
      data-aos="flip-down"
      data-aos-duration="3000"
      bgcolor={"Background"}
      padding={2}
      borderRadius={2}
    >
      <h3 style={{ color: "#f44336" }}>{orders?.length}</h3>
      <h4 style={{ color: "#c6ff00" }}>Purchase Orders</h4>
    </Box>
  );
}

export default PurchaseCard