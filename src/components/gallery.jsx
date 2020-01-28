import React, { Component } from "react";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import CancelIcon from "@material-ui/icons/Cancel";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton
} from "@material-ui/core";
import { Dialog, DialogContent } from "@material-ui/core";

class Gallery extends Component {
  state = {
    previewOpen: false,
    previewImage: undefined
  };

  onClickImage = img => {
    this.setState({ previewOpen: true });
    this.setState({ previewImage: img }); 
  };

  onClosePreview = () => {
    this.setState({ previewOpen: false });
  };

  onAddToCart = img => {
    this.props.addToCart(img);
  };

  renderImages = () => {
    let image_array = [];

    for (let i = 1; i <= 17; i++) {
      image_array.push(require("../images/gallery/" + i + ".jpg"));
    }

    const components = image_array.map(img => {
      return (
        <GridListTile key={img} >
          <img src={img} alt="" onClick={() => this.onClickImage(img)}></img>
          <GridListTileBar
            title={"Cost"}
            subtitle={"Short Description"}
            actionIcon={
              <IconButton onClick={() => this.onAddToCart(img)}>
                <AddShoppingCartIcon style={{ color: "white" }}/>
              </IconButton>
            }
          ></GridListTileBar>
        </GridListTile>
      );
    });
    return components;
  };

  renderPreview = () => {
    const component = (
      <Dialog
        onClose={this.onClosePreview}
        open={this.state.previewOpen}
        maxWidth={"md"}
      >
        <DialogContent>
          <GridListTile>
            <img heigth={"auto"} src={this.state.previewImage} alt=""></img>
            <GridListTileBar
              titlePosition={"top"}
              actionIcon={
                <IconButton onClick={this.onClosePreview}>
                  <CancelIcon style={{ color: "white" }} />
                </IconButton>
              }
            ></GridListTileBar>
            <GridListTileBar
              title={"Cost"}
              subtitle={"Short Description"}
              actionIcon={
                <IconButton
                  onClick={() => this.onAddToCart(this.state.previewImage)}
                >
                  <AddShoppingCartIcon style={{ color: "white" }} />
                </IconButton>
              }
            ></GridListTileBar>
          </GridListTile>
        </DialogContent>
      </Dialog>
    );
    return component;
  };

  render() {
    return (
      <React.Fragment>
        <GridList style={{ padding: "30px" }} spacing={40} cols={3}>
          {this.renderImages()}
        </GridList>
        {this.renderPreview()}
      </React.Fragment>
    );
  }
}

export default Gallery;
