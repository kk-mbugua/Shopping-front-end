import React, { Component } from "react";
import CartClass from "./utilities/cart";
// components
import NavBar from "./components/navbar";
import Gallery from "./components/gallery";
import Banner from "./components/banner";
import Checkout from "./components/checkout";
import Cart from "./components/cart";

// matarial UI
import { Grid, Box, Dialog, Popover } from "@material-ui/core";

class App extends Component {
  state = {
    cart: new CartClass(),
    openCheckout: false,
    cartAnchorEl: null
  };

  constructor() {
    super()
    this.addFakeCartItems()
  }

  componentDidMount() {

  }

  addFakeCartItems = () => {
    this.state.cart.addToCart("Wide checked shuka");
    this.state.cart.addToCart("Slim checked shuka");
    this.state.cart.addToCart("Basic Pattern shuka");
  };

  addToCart = itemID => {
    this.state.cart.addToCart(itemID);
    this.forceUpdate();
  };

  onClickCart = event => {
    const cartAnchorEl = event.target
    this.setState({ cartAnchorEl});
  };

  onClickCheckout = () => {
    const openCheckout = true;
    this.setState({ openCheckout });
  };

  closeCheckout = clearCart => {
    const openCheckout = false;

    if (clearCart) {
      const cart = new CartClass()
      this.setState({cart, openCheckout})
    }
    else {
      this.setState({ openCheckout });
    }
    
  };

  renderCart = () => {
    const component = (
      <Popover
        id={"cart"}
        open={Boolean(this.state.cartAnchorEl)}
        anchorEl={this.state.cartAnchorEl}
        onClose={() => {
          this.setState({ cartAnchorEl: null });
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <Cart
          onClickCheckout={this.onClickCheckout}
          style={{ display: "flex", flexWrap: "wrap" }}
          cart={this.state.cart}
        ></Cart>
      </Popover>
    );

    return component;
  };

  renderCheckout = () => {
    return (
      <Dialog
        open={this.state.openCheckout}
        onBackdropClick={undefined}
        onEscapeKeyDown={undefined}
      >
        <Checkout closeCheckout={this.closeCheckout} cart={this.state.cart}></Checkout>
      </Dialog>
    );
  };

  render() {
    return (
      <React.Fragment>
        <Grid container>
          <NavBar
            cart={this.state.cart}
            itemCount={this.state.itemCount}
            onClickCart={this.onClickCart}
          />
          <Grid item>
            <Box width="95%" height="100%">
              <Banner />
            </Box>
          </Grid>
          <Grid item>
            <Gallery
              cart={this.state.cart}
              addToCart={this.addToCart}
            ></Gallery>
          </Grid>
        </Grid>

        {this.renderCart()}
        {this.renderCheckout()}
      </React.Fragment>
    );
  }
}

export default App;
