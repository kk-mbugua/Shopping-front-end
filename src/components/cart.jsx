import React, { Component } from "react";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Typography,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemSecondaryAction,
  Grid,
  List,
  Box,
  Fab
} from "@material-ui/core";

class Cart extends Component {
  state = {};

  addItemCount = itemID => {
    this.props.cart.addItemCount(itemID);
    this.forceUpdate();
  };

  reduceItemCount = itemID => {
    this.props.cart.reduceItemCount(itemID);
    this.forceUpdate();
  };

  deleteItem = itemID => {
    this.props.cart.deleteItem(itemID);
    this.forceUpdate();
  };

  renderList = () => {
    const cart = this.props.cart;
    const component = cart.items.map(item => {
      return (
        <ListItem key={item.itemID} onMouseEnter={() => {}}>
          <Grid container direction="row" spacing={4} alignItems="center">
            <Grid item xs={6}>
              <Grid container direction="row" alignItems="center">
                <ListItemAvatar>
                  <Avatar>
                    <img src={item.itemID} alt="" />
                  </Avatar>
                </ListItemAvatar>
                <Typography noWrap={true} style={{ width: "60%" }}>
                  {item.itemID}
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={3}>
              <Grid container direction="row" spacing={0} alignItems="center">
                <AddIcon
                  onClick={() => {
                    this.addItemCount(item.itemID);
                  }}
                ></AddIcon>
                <ListItemText>
                  <Typography variant={"h6"}>{item.itemCount}</Typography>
                </ListItemText>
                <RemoveIcon
                  onClick={() => {
                    this.reduceItemCount(item.itemID);
                  }}
                ></RemoveIcon>
              </Grid>
            </Grid>

            <Grid item xs={2}>
              <ListItemText style={{ alignContent: "center" }}>
                <Typography variant={"h6"}>{item.totPrice}</Typography>
              </ListItemText>
            </Grid>

            <Grid item xs={1}>
              <ListItemSecondaryAction>
                <DeleteIcon
                  onClick={() => {
                    this.deleteItem(item.itemID);
                  }}
                ></DeleteIcon>
              </ListItemSecondaryAction>
            </Grid>
          </Grid>
        </ListItem>
      );
    });

    return component;
  };

  renderCheckoutButton = () => {
    const component = (
      <Grid item style={{ alignSelf: "center" }}>
        <Fab
          onClick={() => {
            this.props.onClickCheckout();
          }}
          variant="extended"
          size="large"
          color="secondary"
        >
          Checkout
        </Fab>
      </Grid>
    );

    return component;
  };

  render() {
    return (
      <Grid container direction="column">
        <Grid item>
          <List>{this.renderList()}</List>
        </Grid>
        <Grid item>
          <Typography
            align="right"
            component="div"
            style={{
              display: "flex",
              direction: "row",
              justifyContent: "flex-end",
              alignItems: "center"
            }}
          >
            <Box fontSize={24} fontWeight="fontWeightBold">
              {"Total: "}
            </Box>
            <Box
              style={{ alignSelf: "flex-end" }}
              fontSize={28}
              fontWeight="fontWeightBold"
            >
              {this.props.cart.getCartTotal()}
            </Box>
          </Typography>
        </Grid>

        {(this.props.showCheckoutButton === undefined || this.props.showCheckoutButton) &&
          this.renderCheckoutButton()}
      </Grid>
    );
  }
}

export default Cart;
