import React, {  useContext} from "react";
import Card from "@mui/material/Card";
import { Box } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import Button from '@mui/material/Button';

import { DataContext } from './DataContext';

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";

import "../styels/widget.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

type infoType = {
  id: number,
  city: string;
  condition: string;
  degrees: string;
};

type infoTypesArray = infoType;

const Widgets = (props: infoTypesArray) => {

  const context = useContext(DataContext);

  if (!context) {
    throw new Error('Component must be used within a DataProvider');
  }
  function removeWidget(id : number){
    const filteredData = info.filter(data => data.id !== id)
    setInfo(filteredData)
  }

  const {info , setInfo } = context

  return (
    <div>
      <Card sx={{ maxWidth: 500 }} className="card">
        <CardActionArea
          sx={{ maxHeight: 1000 }}
          className={
            props.condition === "Sunny"
              ? "widget-sunny card-action-area"
              : "widget-rainy card-action-area"
          }
        >
          <CardContent>
            <Box
              
              className = "box"
            >
              <Grid className = "leftGrid">
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  color="white"
                >
                  {props.city}
                </Typography>
                <Grid container alignItems="center">
                  <Grid>
                    <Item>
                      <Typography variant="body1">{props.condition}</Typography>
                    </Item>
                  </Grid>
                  <Grid container justifyContent="flex-end">
                    <Grid>
                      <Item>
                        {props.condition === "Sunny" ? (
                          <WbSunnyIcon />
                        ) : (
                          <ThunderstormIcon />
                        )}
                      </Item>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid className = "rightGrid">
                <Grid>
                  <Item>
                    <Typography variant="body1">
                      {props.degrees}
                      <sup>0</sup> {props.condition === "Sunny" ? (
                          <WbSunnyIcon />
                        ) : (
                          <ThunderstormIcon />
                        )}
                    </Typography>
                  </Item>
                </Grid>
                <Grid>
                <Button variant="contained" className="removeWidget" onClick={() => removeWidget(props.id )} >Remove</Button>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default Widgets;
