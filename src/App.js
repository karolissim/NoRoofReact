import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Navbar from './components/Navbar/Navbar'
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen'
import Shop from './components/Shop/Shop'
import FAQ from './components/FAQ/FAQ'
import Contact from './components/Contact/Contact'
import ItemContainer from './components/ItemContainer/ItemContainer'
import Cart from './components/Cart/Cart';
import ErrorHandler from './components/ErrorHandler/ErrorHandler';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemNumber: 0,
      cartOn: false,
      cartShadow: false,
      error: null,
      isLoaded: false,
      shopItems: [],
      addToCartItem: null,
      limitReached: false
    }

    this.modifyItemNum = this.modifyItemNum.bind(this);
  }

  async componentDidMount() {
    await fetch('http://192.168.1.160:3030/api/item/', { mode: 'cors', method: 'GET' })
      .then(res => res.json())
      .then(
        result => {
          console.log(result.items);
          this.setState({
            isLoaded: true,
            shopItems: result.items
          })
        }
      )
      .catch((error) => {
        console.log(error);
        this.setState({ error: error })
      })
  }

  displayCart = () => {
    this.setState({ cartOn: !this.state.cartOn, cartShadow: !this.state.cartShadow });
    !this.state.cartOn ? document.getElementsByTagName("html")[0].style.overflow = 'hidden' : document.getElementsByTagName("html")[0].style.overflow = 'visible';
  }

  modifyItemNum = (number) => {
    this.setState({ itemNumber: number + this.state.itemNumber });
  }

  addItemToCart = (item) => {
    this.setState({ addToCartItem: item })
  }

  emptyAddToCartItem = () => {
    this.setState({ addToCartItem: null })
  }

  setLimitReached = (bool) => {
    this.setState({limitReached: bool});
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar
            displayCart={this.displayCart}
            shadowState={this.state.cartShadow}
            itemNumber={this.state.itemNumber}
          />
          <Cart
            modifyItemNum={this.modifyItemNum}
            cartOn={this.state.cartOn}
            displayCart={this.displayCart}
            item={this.state.addToCartItem}
            emptyAddToCartItem={this.emptyAddToCartItem}
            shadow={this.state.cartShadow}
            setLimitReached = {this.setLimitReached}
          />
          <Switch>
            <Route exact path="/">
              <WelcomeScreen />
              {this.state.isLoaded ? <Shop shopItems={this.state.shopItems} /> : <div></div>}
            </Route>
            <Route path="/faq" component={FAQ} />
            <Route path="/contact" component={Contact} />
            <Route path="/shop/:itemId/:sizeId">
              <ItemContainer
                limitReached = {this.state.limitReached}
                setLimitReached = {this.setLimitReached}
                allItems={this.state.shopItems}
                addToCart={this.addItemToCart} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }

}

export default App
