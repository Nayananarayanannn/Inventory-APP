import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { CardActionArea, Grid } from "@mui/material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ItemCard() {

  const [expanded, setExpanded] = React.useState(false);
    const [items, setItems] = React.useState();


       const listItems = () => {
         var config = {
           method: "get",
           url: "/api/item",
         };

         axios(config)
           .then(function (response) {
             console.log(JSON.stringify(response.data));
             setItems(response.data);
           })
           .catch(function (error) {
             console.log(error);
           });
       };

       React.useEffect(()=>{
           listItems();
       }, [])
        return (
          <Grid container spacing={2}>
            {items?.map((item) => (
              <Grid data-aos="flip-down" data-aos-duration="3000" item xs={3}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.image}
                      alt={item.itemName}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h8" component="div">
                        {item.itemName}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        );
      

}
