import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";

function VendorCard() {
  const [orders, setOrders] = useState();

  const listOrders = () => {
    var config = {
      method: "get",
      url: "/api/itemGroup",
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
  }, []);

  return (
    <Box
      data-aos="flip-down"
      data-aos-duration="3000"
      bgcolor={"#c6ff00"}
      padding={2}
      borderRadius={2}
    >
      <h3 style={{ color: "Background" }}>{orders?.length}</h3>
      <h4 style={{ color: "#f44336" }}>Item Groups Available</h4>
    </Box>
  );
}

export default VendorCard;
