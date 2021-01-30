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
<<<<<<< HEAD
import Cart from './components/Cart/Cart';
import ErrorHandler from './components/ErrorHandler/ErrorHandler';
import lottie from "lottie-web"
import animation from './loaders/18855-checkmark-icon.json'
=======
import Checkout from './components/Checkout/Checkout'
import { SERVER_URL } from './constants/Constants'

const stripePromise = loadStripe('pk_test_51HXAIhD4jRnDIKXSUReminHgu3nj1XBPMVTJmKzSAyAnQhqrB8FssuvJHI150EpdQ2q0mTDgOctyc3s2HyT83I3G00ZmSekB71');
>>>>>>> main

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
<<<<<<< HEAD
=======
      checkoutAmount: 0,
      checkoutItems: []
>>>>>>> main
    }

    this.modifyItemNum = this.modifyItemNum.bind(this);
  }

<<<<<<< HEAD
  async componentDidMount() {
    await fetch('http://localhost:3030/api/item/', { mode: 'cors', method: 'GET' })
=======
  componentDidMount() {
    fetch(SERVER_URL + "/api/items", { mode: 'cors', method: 'GET' })
>>>>>>> main
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
    return true;
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

  showAnimation = () => {
    // if(!props.limitReached) {
        let anim = lottie.loadAnimation({
            container: document.querySelector(".add-to-cart-animation"),
            loop: false,
            autoplay: false,
            animationData: animation,
        });
        // setAddToCartAnimation(true);
        anim.play();

        anim.addEventListener('complete', function(){
            anim.destroy();
            // setAddToCartAnimation(false);
        });
    // }  
}

  render() {
    return (
      <div className="App">
        <Router>
<<<<<<< HEAD
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
            showAnimation = {this.showAnimation}
          />
=======
>>>>>>> main
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
