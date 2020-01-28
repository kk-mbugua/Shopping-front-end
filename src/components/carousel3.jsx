import React, { Component } from "react";

import { Card, CardMedia, Popover, Radio, Grid, Box } from "@material-ui/core";

class Carousel extends Component {
  state = {
    images: undefined,
    displayImageNumber: undefined,
    selectedValue: undefined,
    anchorEl: undefined
  };

  constructor() {
    super();
    const images = this.getImages();
    this.state.images = images;
    this.state.displayImageNumber = 0;
  }

  componentDidMount() {
    setInterval(this.rotateImages, 5000);
  }

  rotateImages = () => {
    const displayImageNumber =
      (this.state.displayImageNumber + 1) % this.state.images.length;
    this.setState({ displayImageNumber });
  };

  getImages = () => {
    let image_array = [];

    for (let i = 1; i <= 3; i++) {
      image_array.push(require("../images/banner/" + i + ".png"));
    }

    return image_array;
  };

  renderPopover = () => {
    let component = undefined;
    if (this.state.anchorEl !== undefined) {
      component = (
        <Box width="25%" height="25%">
          <Popover
            open
            anchorEl={this.state.anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
          >
            <Grid container style={{ backgroundColor: "rgba(0,0,0,0.0)" }}>
              {this.renderRadios()}
            </Grid>
          </Popover>
        </Box>
      );
    }
    return component;
  };

  renderRadios = () => {
    let count = -1;
    const component = this.state.images.map(image => {
      count += 1;
      return (
        <Radio
        style={{height: "1px", width: "10px", color:"rgba(0,0,0,0.0)"}}
        color="default"
          key={count}
          onClick={event => {
            this.onClickRadio(event);
          }}
          value={count}
          checked={this.state.displayImageNumber === count}
        ></Radio>
      );
    });

    return component;
  };

  onClickRadio = event => {
    const displayImageNumber = Number(event.target.value);
    this.setState({ displayImageNumber });
  };

  render() {
    return (
      <React.Fragment>
        <Card
          onLoad={event => {
            this.setState({ anchorEl: event.target });
          }}
          id="carousel_img"
          style={{ width: "300px" }}
        >
          <CardMedia
            component="img"
            image={this.state.images[this.state.displayImageNumber]}
            style={{ width: "100%" }}
          ></CardMedia>
        </Card>
        {this.renderPopover()}
      </React.Fragment>
    );
  }
}

export default Carousel;
