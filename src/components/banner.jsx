import React, { Component } from "react";
import Carousel from "./carousel2";

import { Typography, Grid, Box } from "@material-ui/core";

class Banner extends Component {
  state = {};
  render() {
    return (
      
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          style={{
            backgroundColor: "rgb(239, 253, 255)",
            height: "500px",
            marginRight: "30px",
            marginLeft: "30px",
            flexWrap: "no-wrap",

          }}
          spacing={2}
        >

          <Grid item sm={5} style={{ padding: "150px" }}>
            <Typography align="center" component="div">
              <Box style={{ display: "flex", flexDirection: "row" }}>
                <Box letterSpacing={12} fontSize={40}>
                  Maasai
                </Box>
                <Box letterSpacing={10} fontStyle="italic" fontSize={40}>
                  Shuka
                </Box>
              </Box>
              <Box fontSize={18}>
                {/* https://www.boysenberryvt.com/maasai-shuka-fabric/#:~:targetText=In%20the%20present%20time%2C%20Shuka%20woven%20in%20bright%20colors%20and%20plaid%2C&targetText=It%20is%20also%20used%20as,scarf%20or%20home%20decoration%20accessory. */}
                A beautiful example of African handicrafts, and always woven in
                vivid red by blending with black, blue or another main colour.
              </Box>
            </Typography>
          </Grid>

          <Grid item sm={7}>
            <Grid justify="center" alignItems="center" container>
            <Carousel/>
            </Grid>
            
          </Grid>
        </Grid>
    );
  }
}

export default Banner;
