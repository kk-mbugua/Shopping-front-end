import React, { Component } from "react";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";


import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge
} from "@material-ui/core";

class NavBar extends Component {
  state = {};

  renderSMBar = position => {
    return (
      <AppBar
        elevation={0}
        color="default"
        position={position}
        style={{ height: "30px", borderBlockStyle: "none", margin: "0" }}
      >
        {/* <Toolbar style={{display: "flex", justifyContent:"space-between", height:"10px"}}> */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "rgb(230, 250, 255)"
          }}
        >
          <div>
            <InstagramIcon
              style={{ color: "black" }}
              onClick={() => {
                console.log("Instagram");
              }}
            />
            <TwitterIcon
              style={{ color: "black" }}
              onClick={() => {
                console.log("Twitter");
              }}
            />
            <FacebookIcon
              style={{ color: "black" }}
              onClick={() => {
                console.log("Facebook");
              }}
            />
            {/* <LinkedInIcon
              style={{ color: "black" }}
              onClick={() => {
                console.log("LinkedIn");
              }}
            /> */}
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginRight: "15px"
              }}
            >
              <PhoneIcon style={{ color: "black" }} />
              <Typography style={{ color: "black" }}>
                +1-123-456-7890
              </Typography>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <EmailIcon style={{ color: "black" }} />
              <Typography style={{ color: "black" }}>
                mail.address@server.com
              </Typography>
            </div>
          </div>
        </div>
        {/* </Toolbar> */}
      </AppBar>
    );
  };

  renderNavBar = position => {
    return (
      <AppBar
        elevation={0}
        color="default"
        position={position}
        style={{ backgroundColor: "rgb(239, 253, 255)" }}
      >
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Typography
              variant="h2"
              style={{ fontWeight: "bold", color: "black" }}
            >
              Website Title
            </Typography>
          </div>
          <div style={{ display: "flex" }}>
            <Typography variant="h4" style={{ margin: "10px", color: "black" }}>
              Home
            </Typography>
            <Typography variant="h4" style={{ margin: "10px", color: "black" }}>
              About Us
            </Typography>
            <Typography variant="h4" style={{ margin: "10px", color: "black" }}>
              Contact
            </Typography>
          </div>
          <div>
            <IconButton onClick={event => this.onClickCart(event)}>
              <Badge
                badgeContent={this.props.cart.getItemCount()}
                color={"secondary"}
              >
                <ShoppingCartIcon></ShoppingCartIcon>
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    );
  };

  onClickCart = event => {
    this.props.onClickCart(event);
  };

  render() {
    return (
      <React.Fragment>
        {this.renderSMBar("relative")}
        {this.renderNavBar("sticky")}
      </React.Fragment>
    );
  }
}

export default NavBar;
