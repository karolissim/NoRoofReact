import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Navigation from './components/Navigation/Navigation'
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen'
import Shop from './components/Shop/Shop'
import FAQ from './components/FAQ/FAQ'
import ItemContainer from './components/ItemContainer/ItemContainer'
import Checkout from './components/Checkout/Checkout'
import ErrorPage from './components/ErrorPage/ErrorPage'
import { SUCCESS_STATE, ERROR_MESSAGE_PAGE_DOES_NOT_EXIST } from './Constants/Constants'
import { api } from './api/Api'

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
      checkoutAmount: 0,
      checkoutItems: [],
      snackbarState: {
        isOpen: false,
        messageType: SUCCESS_STATE,
        limitReached: false
      }
    }

    this.modifyItemNum = this.modifyItemNum.bind(this);
    this.changeSnackbarState = this.changeSnackbarState.bind(this)
  }

  componentDidMount() {
    const getItems = async () => {
      try {
        const response = await api.get('/api/items')
        this.setState({
          isLoaded: true,
          shopItems: response.data.items
        })
      } catch (error) {
        this.setState({
          isLoaded: false,
          error: `Couldn't fetch items from server`
        })
      }
    }

    getItems()
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

  handleCheckout = (items, amount) => {
    this.setState({ checkoutAmount: amount, checkoutItems: items })
  }

  setItemQuantityInCart = (quantity) => {
    this.setState({ itemNumber: quantity })
  }

  changeSnackbarState = (state, limitReached) => {
    this.setState({ snackbarState: { messageType: state, isOpen: true, limitReached: limitReached } })
  }

  handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    this.setState({ snackbarState: { ...this.state.snackbarState, isOpen: false } })
  }

  closeSnackbar = () => {
    this.setState({ snackbarState: { ...this.state.snackbarState, isOpen: false } })
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
                handleCheckout={this.handleCheckout}
                setItemQuantityInCart={this.setItemQuantityInCart}
                changeSnackbarState={this.changeSnackbarState} />
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
                handleCheckout={this.handleCheckout}
                setItemQuantityInCart={this.setItemQuantityInCart}
                setItemQuantityInCart={this.setItemQuantityInCart}
                changeSnackbarState={this.changeSnackbarState} />
              <FAQ />
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
                handleCheckout={this.handleCheckout}
                setItemQuantityInCart={this.setItemQuantityInCart}
                setItemQuantityInCart={this.setItemQuantityInCart}
                changeSnackbarState={this.changeSnackbarState} />
              <ItemContainer
                allItems={this.state.shopItems}
                addToCart={this.addItemToCart}
                snackbarState={this.state.snackbarState}
                handleSnackbarClose={this.handleSnackbarClose}
                closeSnackbar={this.closeSnackbar} />
            </Route>
            <Route path="/checkout">
              <Elements stripe={stripePromise}>
                <Checkout />
              </Elements>
            </Route>
            <Route>
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
                handleCheckout={this.handleCheckout}
                setItemQuantityInCart={this.setItemQuantityInCart}
                setItemQuantityInCart={this.setItemQuantityInCart}
                changeSnackbarState={this.changeSnackbarState} />
              <ErrorPage
                message={ERROR_MESSAGE_PAGE_DOES_NOT_EXIST} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App
