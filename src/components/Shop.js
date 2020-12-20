import React, { Component } from 'react'
import './Shop.css'

class Shop extends Component {
    render() {
        const items = this.props.shopItems
        return (
            <div id="Shop" className="shop-screen">
                <div className="shop-text">
                    <h1>Welcome to the shop</h1>
                    <h3>FREE SHIPPING ON ALL ORDERS OVER 80€</h3>
                </div>
                <div className="divider"></div>
                <div className="item-list">
                    <div className="shopping-items">
                       {items.map((item, i) => {
                        return (
                            <div className="hoodie" key={i}>
                                <img className="item-image" src={require("../images/" + item.product_id + ".jpg").default}></img>
                            </div>
                        )
                    })} 
                    </div>
                </div>
                <div id="cart-message"></div>
            </div>
        )
    }
}

export default Shop