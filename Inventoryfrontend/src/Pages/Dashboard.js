import { CardHeader, Container, Grid } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import ItemCard from '../Components/dashoard/ItemCard'
import ItemGroups from '../Components/dashoard/ItemGroups';
import PurchaseCard from '../Components/dashoard/PurchaseCard';
import VendorCard from '../Components/dashoard/VendorCard';
import Aos from "aos";
import "aos/dist/aos.css";

function Dashboard() {
    useEffect(() => {
      Aos.init({});
    }, []);

  return (
    <Container>
      <Box
        data-aos="fade-out"
        data-aos-duration="2000"
        height={"35vh"}
        style={{
          overflowY: "scroll",
          padding: "0vh 5vw 5vh 5vw",
          borderRadius: "10px",
          marginTop: "5vh",
        }}
        bgcolor={"rgba(150,200,250,0.3)"}
      >
        <h4 style={{ textAlign: "left" }}> Items Available</h4>
        <ItemCard />
      </Box>
      <Box
        data-aos="fade-out"
        data-aos-duration="2000"
        height={"25vh"}
        style={{
          padding: "5vh 5vw 5vh 5vw",
          borderRadius: "10px",
          marginTop: "5vh",
        }}
        bgcolor={"rgba(150,250,250,0.3)"}
      >
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <PurchaseCard />
          </Grid>
          <Grid item xs={4}>
            <VendorCard />
          </Grid>
          <Grid item xs={4}>
            <ItemGroups />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Dashboard