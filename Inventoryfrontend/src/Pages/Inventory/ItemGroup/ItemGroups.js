import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import GroupCards from "../../../Components/inventory/GroupCards";
import axios from "axios";

function ItemGroups() {
  const [groups, setGroups] = useState();
  // fetch all groups api
  const listGroups = () => {
    var config = {
      method: "get",
      url: "/api/itemGroup",
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setGroups(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    listGroups();
  }, []);

  return (
    <Grid container sx={{ marginTop: "4vh" }}>
      <Grid xs={2}></Grid>
      <Grid xs={8}>
        <a href="/home/inventory/group-add">
          <Button
            style={{ display: "flex", justifyContent: "flex-end" }}
            variant="contained"
            endIcon={<AddCircleIcon />}
          >
            Add New Group
          </Button>
        </a>
        <div
          style={{
            width: "80vw",
            height: "63vh",
            overflow: "auto",
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            padding: "3vh 0vw",
          }}
        >
          {groups?.map((group) => (
            <>
              <GroupCards group={group} />
            </>
          ))}
        </div>
      </Grid>
    </Grid>
  );
}

export default ItemGroups;
