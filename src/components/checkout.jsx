import React, { Component } from "react";
// components
import Cart from "./cart";
//material-ui
import CancelIcon from "@material-ui/icons/Cancel";
import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  TextField,
  Checkbox,
  FormGroup
} from "@material-ui/core";
import {
  DialogActions,
  Grid,
  DialogContent,
  DialogTitle,
  Button,
  IconButton
} from "@material-ui/core";
import { Autocomplete } from '@material-ui/lab';

class Checkout extends Component {
  state = {
    stage: undefined,
    shippingInfo: undefined,
    paymentInfo: undefined
  };

  stage = {
    orderInfo: "orderInfo",
    shippingInfo: "shippingInfo",
    paymentInfo: "paymentInfo",
    finalConfirmation: "finalConfirmation",
    done: "done"
}

  shippingInfo = {
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: ""
  }

  paymentInfo = {
      nameOnCard: "", 
      cardNumber: "",
      cvc: "",
      expDate:"",
      billingAddress:""
  }

  constructor() {
    super();
    this.state.stage = "orderInfo";
    this.state.shippingInfo = this.shippingInfo
  }
  
  componentDidUpdate() {
    // this.state.shippingInfo = this.shippingInfo
  }

  renderOrderInfo = () => {
    const title = "Confrim Your Order";
    const content = (
      <Cart cart={this.props.cart} showCheckoutButton={false}></Cart>
    );
    const actions = (
      this.renderNavStageButton("Continue", this.stage.shippingInfo, false)
    );
    return this.compObject(title, content, actions);
  };

  renderShippingInfo = () => {
    const title = "Shipping Information";
    const content = (
      <form style={{display: "flex", flexDirection:"column"}}>
        <FormControl error={false} required>
          <InputLabel htmlFor="my-address-line-1">Address Line 1</InputLabel>
          <Input id="address-line-1" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">Required</FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel>Address Line 2</InputLabel>
          <Input />
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl required>
          <InputLabel>City</InputLabel>
          <Input />
          <FormHelperText>Required</FormHelperText>
        </FormControl>
        <FormControl required>
          <Autocomplete renderInput={(params)=>{return(<TextField/>)}}/>
          <FormHelperText>Required</FormHelperText>
        </FormControl>
        <FormControl required>
          <InputLabel> Zip</InputLabel>
          <Input />
          <FormHelperText>Required</FormHelperText>
        </FormControl>
      </form>
    );
    const actions = (
        <React.Fragment>
            {this.renderNavStageButton("Previous", this.stage.orderInfo, false)}
            {this.renderNavStageButton("Continue", this.stage.paymentInfo, false)}
        </React.Fragment>
    );
    return this.compObject(title, content, actions);
  };

  renderPaynentInfo = () => {
    const title = "Payment Information";
    const diffBillingAddress = false
    const content = (
        <form style={{display: "flex", flexDirection:"column"}}>
        <FormControl error={false} required>
          <InputLabel htmlFor="my-address-line-1">Name on card</InputLabel>
          <Input id="address-line-1" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">Required</FormHelperText>
        </FormControl>
        <FormControl required>
          <InputLabel>Card Number</InputLabel>
          <Input />
          <FormHelperText>Required</FormHelperText>
        </FormControl>
        <FormControl required>
          <InputLabel>cvc</InputLabel>
          <Input />
          <FormHelperText>Required</FormHelperText>
        </FormControl>
        <FormControl required>
          <InputLabel> Expiration Date</InputLabel>
          <Input />
          <FormHelperText>Required</FormHelperText>
        </FormControl>
<FormGroup>
    <InputLabel>Billing Address same as shipping address</InputLabel>
    <Checkbox checked={!diffBillingAddress}></Checkbox>
</FormGroup>
        { (diffBillingAddress) && this.renderShippingInfo().content}
      </form>
      
    )

    const actions = (
        <React.Fragment>
            {this.renderNavStageButton("Previous", this.stage.shippingInfo, false)}
            {this.renderNavStageButton("Continue", this.stage.finalConfirmation, false)}
        </React.Fragment>
    );
    return this.compObject(title, content, actions);
  };

  renderFinalConfirmation = () => {
    const title = "Confirm Your Details";
    // maybe make dialog wider and put things side by side
    const content = (
        <React.Fragment>
            {this.renderOrderInfo().content}
            {this.renderShippingInfo().content}
            {this.renderPaynentInfo().content}
        </React.Fragment>
    );
    const actions = (
        this.renderNavStageButton("Confirm Details", this.stage.done, false)
    );
    return this.compObject(title, content, actions);
  };

  renderDone = () => {
    const title = "Done!";
    const content = (
        <React.Fragment>
            <h2>Thank you for shopping with us!</h2>
            <h3>Your order has been received</h3>
            <h4>A receipt has been sent to your email</h4>
        </React.Fragment>
    );
    const actions = (
        <Button onClick={()=> {this.props.closeCheckout(true)}}>Done</Button>
    );
    return this.compObject(title, content, actions);
  };

  compObject = (title, content, actions) => {
    return { title: title, content: content, actions: actions };
  };

  renderNavStageButton = (text, stage, disabled) => {
    return (
        <Button onClick={()=>{this.setStage(stage)}} disabled={disabled}>{text}</Button>
    )
  }

  setStage(stage) {
      this.setState({stage})
  };

  checkoutSwitch = (stage) => {
    let components = undefined;

    switch (stage) {
      case this.stage.orderInfo:
        components = this.renderOrderInfo();
        break;
      case this.stage.shippingInfo:
        components = this.renderShippingInfo();
        break;
      case this.stage.paymentInfo:
        components = this.renderPaynentInfo();
        break;
      case this.stage.finalConfirmation:
        components = this.renderFinalConfirmation();
        break;
      case this.stage.done:
        components = this.renderDone();
        break;

      default:
        components = {
          title: "Default",
          content: <h4>Default</h4>,
          actions: undefined
        };
        break;
    }

    const { title, content, actions } = components;
    return this.renderStage(title, content, actions);
  };

  renderStage = (title, content, actions) => {
    return (
      <React.Fragment>
        <DialogTitle>
          <Grid container justify="space-between" alignItems="center">
            {title}
            <IconButton
              onClick={() => {
                this.props.closeCheckout();
              }}
            >
              <CancelIcon></CancelIcon>
            </IconButton>
          </Grid>
        </DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>{actions}</DialogActions>
      </React.Fragment>
    );
  };

  render() {
    return (
      <React.Fragment>{this.checkoutSwitch(this.state.stage)}</React.Fragment>
    );
  }
}

export default Checkout;
