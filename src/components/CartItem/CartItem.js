import React from 'react';

import "./CartItem.css"
import { Link } from 'react-router-dom'
import { COLORS, SERVER_URL } from '../../Constants/Constants';

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
        let randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
        document.documentElement.style.setProperty('--remove-item-color', randomColor);
        this.setState({ itemCloseHover: true });
    }

    closeExit() {
        this.setState({ itemCloseHover: false });
    }

    render() {
        const item = this.props.item;
        return (
            <li className="cart-item">
                <Link to={"/shop/" + item.cartItem.itemId + "/" + item.cartItem.itemSizeId + "/" + item.cartItem.itemColorId}>
                    <img className="cart-preview-photo" src={SERVER_URL + "/images/" + item.cartItem.itemId + "/" + item.cartItem.itemColorId + "/1.jpg"} alt={item.cartItem.name} title={item.cartItem.name} onClick={this.props.displayCart}></img>
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
                        <div className="quantity-minus" onClick={() => this.props.decrementQuantity(item.key)}>
                            <span className="inc-visual"> - </span>
                        </div>
                        <input type="text" className="quantity-input" value={item.cartItem.quantity} disabled></input>
                        <div className="quantity-plus" onClick={() => this.props.incrementQuantity(item.key)}>
                            <span className="inc-visual"> + </span>
                        </div>
                    </div>

                    <div className="price">
                        <span> € </span>
                        <span> {item.cartItem.price * item.cartItem.quantity} </span>
                    </div>

                    <div className={this.state.itemCloseHover ? "item-remove img-replace itm-rmv" : "item-remove img-replace"}
                        onMouseOver={this.changeColor} onMouseOut={this.closeExit} onClick={() => this.props.removeItem(item.key)}>Remove</div>
                </div>
            </li>
        )
    }

}

export default CartItem
