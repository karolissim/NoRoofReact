import React from 'react'
import { Link } from 'react-router-dom'
import './Cart.css'
import CartItem from '../CartItem/CartItem';
import { COLORS } from '../../constants/Constants';
/*eslint no-unused-expressions: ["error", { "allowTernary": true }]*/


var localStorage = window.localStorage;

class Cart extends React.Component {

    constructor(props) {
        super(props);
        let cartItems = this.getItemsFromLocalStorage();
        let total;
        localStorage.getItem("totalPrice") ? total = JSON.parse(localStorage.getItem("totalPrice")) : total = 0;

        this.state = {
            cartShadow: false,
            totalPrice: total,
            cartItems: cartItems
        };
        this.addItem = this.addItem.bind(this);
        this.incrementQuantity = this.incrementQuantity.bind(this);
        this.decrementQuantity = this.decrementQuantity.bind(this);
        this.setLocalStorage = this.setLocalStorage.bind(this);
        this.closeCart = this.closeCart.bind(this);
    }

    /**
     * sets up the state to either have items that were in the cart previously or if
     * there were none or those have already expired - an empty.
     * 
     * @returns cartItems - a list of items that were in the cart or an empty list
     */
    getItemsFromLocalStorage() {
        console.log(localStorage);
        let cartItems = [];
        let now = new Date();
        let quantity = 0;

        if (localStorage.getItem("cartItems")) {
            let expiry = JSON.parse(localStorage.getItem("exp"));
            expiry < now.getTime() ? localStorage.clear() : (cartItems = JSON.parse(localStorage.getItem("cartItems")));
        }

        cartItems.forEach((element) => {
            quantity += element.cartItem.quantity;
        });

        this.props.setItemQuantityInCart(quantity)
        return cartItems;
    }

    /**
     * increments quantity by 1 of an item identified by @param key .
     * 
     * @param  {String} key - item key for identification
     */
    incrementQuantity(key) {
        let updatedCart = this.state.cartItems;
        let price = 0;
        let value = 0;
        updatedCart.forEach((element) => {
            if (element.key === key) {
                if (element.cartItem.maxQuantity !== element.cartItem.quantity) {
                    element.cartItem.quantity += 1;
                    price = element.cartItem.price;
                    value = 1;
                }

            }
        });
        this.setState({
            cartItems: updatedCart,
            totalPrice: this.state.totalPrice + price
        });
        this.props.modifyItemNum(value);
    }

    /** 
     * This function is passed as a prop to CartItem component.
     * Used to decrement quantity and update the price of an item identified by
     * @param key .
     * 
     * @param  {String} key - item key for identification
     */
    decrementQuantity(key) {
        let updatedCart = this.state.cartItems;
        let price = 0;
        updatedCart.forEach((element) => {
            if (element.key === key) {

                if (element.cartItem.quantity > 1) {
                    element.cartItem.quantity -= 1;
                    price = element.cartItem.price;
                }
            }
        });
        this.setState({
            cartItems: updatedCart,
            totalPrice: this.state.totalPrice - price
        });
        this.props.modifyItemNum(-1);
    }

    /** 
     * method that changes color of the close cart button "X" once it is hovered over
     */
    changeColor(name) {
        let randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
        document.documentElement.style.setProperty(name, randomColor);
    }

    /**
     * removes an item specified by @param {String} key from cart and changes the item
     * count.
     * 
     * @param  {String} key - key of an item that needs to be removed
     */
    removeItem = (key) => {
        let price = 0;
        let quantity = 0;
        let withoutItem = this.state.cartItems.filter(function (value, _index, _arr) {
            if (value.key === key) {
                price = value.cartItem.quantity * value.cartItem.price;
                quantity = value.cartItem.quantity;
            }
            return !(value.key === key);
        });
        this.setState({
            cartItems: withoutItem,
            totalPrice: this.state.totalPrice - price
        }
        );
        this.props.modifyItemNum(-quantity);
    }

    /**
     * checks whether an item like this already exists in the cart, if it does, add this
     * item to that one, otherwise add this to the cart.
     * 
     * @param  {Object} item - item that should be added to cart.
     */
    addItem(item) {
        let itemArray = this.state.cartItems;
        let quantity = item.cartItem.quantity;

        let index = itemArray.findIndex(function (currentValue, _index, _arr) {
            return currentValue.key === item.key;
        });

        if (index !== -1) {
            let newQuantity = itemArray[index].cartItem.quantity + quantity;
            console.log(newQuantity);
            console.log(itemArray[index].cartItem.maxQuantity);
            if (newQuantity > itemArray[index].cartItem.maxQuantity) {
                quantity = 0;
                this.props.setLimitReached(true);
            } else {
                itemArray[index].cartItem.quantity += quantity;
                this.props.showAnimation()
            }
        } else {
            itemArray.push(item);
        }

        this.props.modifyItemNum(quantity);
        this.setState({
            cartItems: itemArray,
            totalPrice: this.state.totalPrice + item.cartItem.price * quantity
        });
    }

    /**
     * updating local storage with cart
     */
    setLocalStorage() {
        let now = new Date();
        let expiry = now.getTime() + Math.pow(1000, 2) * 35;
        localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems));
        localStorage.setItem("totalPrice", JSON.stringify(this.state.totalPrice));
        localStorage.setItem("exp", JSON.stringify(expiry));
    }

    /**
     * closes cart and waits until the cart is closed to recolour the checkout button
     */
    closeCart() {
        this.props.displayCart();
    }


    /**
     * if a component is updated, update local storage with new information
     * 
     * @param  {Object} prevProps - props of the component before it was updated
     * @param  {Object} prevState - previous state of component
     */
    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            this.setLocalStorage();
        }
        if (this.props.item !== null) {
            this.addItem(this.props.item);
            this.props.emptyAddToCartItem();
        }

        if (!prevProps.shadow) {
            this.changeColor('--check-out-button');
        }
    }

    render() {
        return (
            <div id="cart" className={this.props.cartOn ? "speed-in" : ""}>
                <div id="cart-header">
                    <h2 id="cart-tag">Cart</h2>
                    <div className="close-container" id="close1" onMouseEnter={() => this.changeColor('--close-cart-color')} onClick={this.closeCart} >
                        <div className="leftright"></div>
                        <div className="rightleft"></div>
                    </div>
                </div>

                <ul className="cart-items" id="cart-item-container">
                    {this.state.cartItems.map((item) => (<CartItem key={item.key}
                        item={item}
                        removeItem={this.removeItem}
                        incrementQuantity={this.incrementQuantity}
                        decrementQuantity={this.decrementQuantity}
                        displayCart={this.props.displayCart}
                    />))}
                </ul>

                <div id="cart-total">
                    <p id="total-wrapper">Total
                        <span id="total">{this.state.totalPrice}</span>
                        <span id="currency">€</span>
                    </p>
                </div>
                <Link to="/checkout">
                    <span className="checkout-btn" onClick={() => {
                        console.log(this.state.cartItems)
                        window.localStorage.setItem('checkoutItems', JSON.stringify({cartItems: [...this.state.cartItems], totalPrice: this.state.totalPrice})) //{...this.state.cartItems, totalPrice: this.state.totalPrice}
                        this.props.handleCheckout(this.state.cartItems, this.state.totalPrice)
                        this.closeCart()
                    }}>Checkout</span>
                </Link>
            </div>
        )
    }
}

export default Cart