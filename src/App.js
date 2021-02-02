import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Navigation from './components/Navigation/Navigation'
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen'
import Shop from './components/Shop/Shop'
import FAQ from './components/FAQ/FAQ'
import Contact from './components/Contact/Contact'
import ItemContainer from './components/ItemContainer/ItemContainer'
import Checkout from './components/Checkout/Checkout'
import { SERVER_URL } from './Constants/Constants'

const stripePromise = loadStripe('pk_test_51HXAIhD4jRnDIKXSUReminHgu3nj1XBPMVTJmKzSAyAnQhqrB8FssuvJHI150EpdQ2q0mTDgOctyc3s2HyT83I3G00ZmSekB71');

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
      limitReached: false,
      checkoutAmount: 0,
      checkoutItems: []
    }

    this.modifyItemNum = this.modifyItemNum.bind(this);
  }

  componentDidMount() {
    fetch(SERVER_URL + "/api/items", { mode: 'cors', method: 'GET' })
      .then(res => res.json())
      .then(
        result => {
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
    this.setState({ limitReached: bool });
  }

  handleCheckout = (items, amount) => {
    this.setState({ checkoutAmount: amount, checkoutItems: items })
  }

  setItemQuantityInCart = (quantity) => {
    this.setState({ itemNumber: quantity })
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <Navigation
                displayCart={this.displayCart}
                shadowState={this.state.cartShadow}
                itemNumber={this.state.itemNumber}
                modifyItemNum={this.modifyItemNum}
                cartOn={this.state.cartOn}
                displayCart={this.displayCart}
                item={this.state.addToCartItem}
                emptyAddToCartItem={this.emptyAddToCartItem}
                shadow={this.state.cartShadow}
                setLimitReached={this.setLimitReached}
                handleCheckout={this.handleCheckout}
                setItemQuantityInCart={this.setItemQuantityInCart} />
              <WelcomeScreen />
              {this.state.isLoaded ? <Shop shopItems={this.state.shopItems} /> : <div></div>}
            </Route>
            <Route path="/faq">
              <Navigation
                displayCart={this.displayCart}
                shadowState={this.state.cartShadow}
                itemNumber={this.state.itemNumber}
                modifyItemNum={this.modifyItemNum}
                cartOn={this.state.cartOn}
                displayCart={this.displayCart}
                item={this.state.addToCartItem}
                emptyAddToCartItem={this.emptyAddToCartItem}
                shadow={this.state.cartShadow}
                setLimitReached={this.setLimitReached}
                handleCheckout={this.handleCheckout}
                setItemQuantityInCart={this.setItemQuantityInCart} />
              <FAQ />
            </Route>
            <Route path="/contact">
              <Navigation
                displayCart={this.displayCart}
                shadowState={this.state.cartShadow}
                itemNumber={this.state.itemNumber}
                modifyItemNum={this.modifyItemNum}
                cartOn={this.state.cartOn}
                displayCart={this.displayCart}
                item={this.state.addToCartItem}
                emptyAddToCartItem={this.emptyAddToCartItem}
                shadow={this.state.cartShadow}
                setLimitReached={this.setLimitReached}
                handleCheckout={this.handleCheckout}
                setItemQuantityInCart={this.setItemQuantityInCart} />
              <Contact />
            </Route>
            <Route path="/shop/:itemId/:sizeId/:colorId">
              <Navigation
                displayCart={this.displayCart}
                shadowState={this.state.cartShadow}
                itemNumber={this.state.itemNumber}
                modifyItemNum={this.modifyItemNum}
                cartOn={this.state.cartOn}
                displayCart={this.displayCart}
                item={this.state.addToCartItem}
                emptyAddToCartItem={this.emptyAddToCartItem}
                shadow={this.state.cartShadow}
                setLimitReached={this.setLimitReached}
                handleCheckout={this.handleCheckout}
                setItemQuantityInCart={this.setItemQuantityInCart} />
              <ItemContainer
                limitReached={this.state.limitReached}
                setLimitReached={this.setLimitReached}
                allItems={this.state.shopItems}
                addToCart={this.addItemToCart} />
            </Route>
            <Route path="/checkout">
              <Elements stripe={stripePromise}>
                <Checkout />
              </Elements>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App
