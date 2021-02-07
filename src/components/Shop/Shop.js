import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Shop.css'
import { SERVER_URL } from '../../Constants/Constants'

const Shop = (props) => {
    // useEffect(() => {

    // }, [])
    const items = props.shopItems
    return (
        <div id="Shop" className="shop-screen">
            <div className="shop-text">
                <h1>Welcome to the shop</h1>
                <h3>FREE SHIPPING ON ALL ORDERS OVER 80€</h3>
            </div>
            <div className="divider"></div>
            <div className="item-list">
                <div className="shop-grid">
                    {items.map((item, i) => {
                        return (
                            <div className="shop-grid__item" key={i}>
                                <div className="shop-grid__item-info">
                                    <Link to={"/shop/" + item.product_id + "/" + item.size_id + "/" + item.product_color_id}>
                                        <img className="item-image" src={SERVER_URL + "/images/" + item.product_id + "/" + item.product_color_id + "/1.jpg"} alt=""></img>
                                    </Link>
                                    <h2>{item.name}</h2>
                                    <h3>€{item.price}</h3>
                                </div>
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