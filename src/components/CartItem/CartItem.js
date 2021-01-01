import React from 'react';

import "./CartItem.css"
import { Link } from 'react-router-dom'
import {colors} from '../../Constants/Constants';

class CartItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            itemCloseHover: false
        };

        this.changeColor = this.changeColor.bind(this);
        this.closeExit = this.closeExit.bind(this);
    }

    changeColor() {
        let randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.documentElement.style.setProperty('--remove-item-color', randomColor);
        this.setState({ itemCloseHover: true });
    }

    closeExit() {
        this.setState({ itemCloseHover: false });
    }

    render() {
        const item = this.props.item;
        console.log("/shop/" + item.cartItem.itemColorId + "/" + item.cartItem.itemSizeId)
        return (
            <li className="cart-item">
                <Link to={"/shop/" + item.cartItem.itemId + "/" + item.cartItem.size}>
                    <img className="cart-preview-photo" src={item.cartItem.src} alt={item.cartItem.name} title={item.cartItem.name} onClick={this.props.displayCart}></img>
                </Link>
                <div className="cart-info">
                    <span hidden={item.cartItem.itemId} className="item-id"></span>
                    <span hidden={item.cartItem.itemSizeId} className="item-size-id"></span>
                    <span hidden={item.cartItem.itemColorId} className="item-color-id"></span>

                    <span className="prdct-name" title={item.cartItem.name}>{item.cartItem.name}</span>
                    <div className="color-size-wrapper">
                        <span className="color-size">{item.cartItem.color + " / " + item.cartItem.size}</span>
                    </div>

                    <div className="inc-quantity">
                        <a className="quantity-minus" onClick={() => this.props.decrementQuantity(item.key)}>
                            <span className="inc-visual"> - </span>
                        </a>
                        <input type="text" className="quantity-input" value={item.cartItem.quantity} disabled></input>
                        <a className="quantity-plus" onClick={() => this.props.incrementQuantity(item.key)}>
                            <span className="inc-visual"> + </span>
                        </a>
                    </div>

                    <div className="price">
                        <span> € </span>
                        <span> {item.cartItem.price * item.cartItem.quantity} </span>
                    </div>

                    <a className={this.state.itemCloseHover ? "item-remove img-replace itm-rmv" : "item-remove img-replace"}
                        onMouseOver={this.changeColor} onMouseOut={this.closeExit} onClick={() => this.props.removeItem(item.key)}>Remove</a>
                </div>
            </li>
        )
    }

}

export default CartItem
