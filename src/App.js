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
      cartOn: false,
      cartShadow: false
    }
  }

  displayCart = () => {
    this.setState( {cartOn: !this.state.cartOn, cartShadow: !this.state.cartShadow});
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar 
            displayCart = {this.displayCart}
            shadowState = {this.state.cartShadow}
            />
          <Cart 
          displayCart = {this.state.cartOn}
          displayCartFnc = {this.displayCart}
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
