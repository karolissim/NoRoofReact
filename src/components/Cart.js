import React from 'react';
import './Cart.css'


const colors = [
    //block green
    'rgb(131,209,104)',
    'rgb(255,225,93)',
    'rgb(107,204,241)',
    'rgb(237,185,104)',
    'rgb(197,177,213)',
    'rgb(255,165,191)',
    'rgb(194,226,96)',
    'red',
    'cyan',
    'orange',
    'pink'
];

class Cart extends React.Component {


    changeColor() {
        let randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.documentElement.style.setProperty('--close-cart-color', randomColor);
    }

    render() {
        return (
            <div id="cart" className = {this.props.displayCart ? "speed-in" : ""}>
                <div id="cart-header">
                    <h2 id="cart-tag">Cart</h2>
                    <div className="close-container" id="close1" onMouseEnter = {this.changeColor} onClick= {this.props.displayCartFnc} >
                        <div className="leftright"></div>
                        <div className="rightleft"></div>
                    </div>
                </div>
                
                <ul className="cart-items" id="cart-item-container">

                </ul>

                <div id="cart-total">
                    <p id="total-wrapper">Total 
                        <span id="total">0</span>
                        <span id="currency">€</span>
                    </p>
                </div>
                <a href="#0" className="checkout-btn">Checkout</a>
             </div>
        )
    }
}

export default Cart