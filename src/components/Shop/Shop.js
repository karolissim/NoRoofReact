import React from 'react'
import { Link } from 'react-router-dom'
import './Shop.css'

const Shop = (props) => {
    const items = props.shopItems
    console.log(props);
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
                        const size = item.available_size.split(",")[0]
                        return (
                            <div className="item" key={i}>
                                <Link to={"/shop/" + item.product_id + "/" + size}>
                                    <img className="item-image" src={require("../../images/" + item.product_id + ".jpg").default} alt=""></img>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div id="cart-message"></div>
        </div>
    )
}

export default Shop