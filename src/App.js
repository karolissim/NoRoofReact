import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Shop from './components/Shop';
import Cart from './components/Cart';

class App extends Component {
  constructor(props) {

    super(props);

    this.state = {
      itemNumber: 0,
      cartOn: false,
      cartShadow: false
    };
    this.modifyItemNum = this.modifyItemNum.bind(this);
  }

  displayCart = () => {
    this.setState( {cartOn: !this.state.cartOn, cartShadow: !this.state.cartShadow});
    !this.state.cartOn ? document.getElementsByTagName("html")[0].style.overflow = 'hidden' : document.getElementsByTagName("html")[0].style.overflow = 'visible';
  }

  modifyItemNum = (number) => {
    console.log(number);
    this.setState({itemNumber: number + this.state.itemNumber});
  }
  

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar 
            displayCart = {this.displayCart}
            shadowState = {this.state.cartShadow}
            itemNumber = {this.state.itemNumber}
            />
          <Cart
            modifyItemNum = {this.modifyItemNum}
            cartOn = {this.state.cartOn}
            displayCart = {this.displayCart}
            />
          <Switch>
            <Route path="/">
              <Home/>
              <Shop/>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }

}

export default App
