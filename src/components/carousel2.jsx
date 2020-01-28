import React, { Component } from "react";
import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel as C } from "react-responsive-carousel";

class Carousel extends Component {
  state = {
    images: [],
    interval: 6000,
    displayImageNumber: undefined
  };

  constructor() {
    super();
    this.state.images = this.getImages();
  }

  getImages = () => {
    let image_array = [];

    for (let i = 1; i <= 3; i++) {
      image_array.push(require("../images/banner/" + i + ".png"));
    }

    return image_array;
  };

  render1 = () => {
    return (
      <AutoRotatingCarousel open>
        {this.state.images.map(image => {
          return <Slide key={image} media={<img src={image} alt=""></img>} />;
        })}
      </AutoRotatingCarousel>
    );
  };

  render2 = () => {
    return (
      <C autoPlay width="300px" dynamicHeight={true} showThumbs={false} infiniteLoop={true} showArrows={false} showStatus={false} >
        {this.state.images.map(image => {
          return (
            <div style={{ width: "auto",color: "rgba(0,0,0,0.0)" }} key={image}>
              <img style={{backgroundColor: "rgb(239, 253, 255)" }} src={image} alt={""}></img>
            </div>
          );
        })}
      </C>
    );
  };

  render() {
    return this.render2();
  }
}

export default Carousel;
