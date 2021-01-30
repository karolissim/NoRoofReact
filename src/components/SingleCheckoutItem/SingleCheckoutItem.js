import React from 'react'
import { SERVER_URL } from '../../constants/Constants'

const SingleCheckoutItem = (props) => {
    const { item: { name, color, size, quantity, price, itemColorId, itemId } } = props
    return (
        <div className="single-item">
            <div className="single-item__image-container">
                <img className="single-item__image" src={SERVER_URL + "/images/" + itemId + "/" + itemColorId + "/1.jpg"}></img>
            </div>
            <div className="single-item__information">
                <h3>{name}</h3>
                <p>{`${color} / ${size}`}</p>
            </div>
            <div className="single-item__price">
                <p>{price * quantity}€</p>
            </div>
            <div className="single-item__count">
                <span>{quantity}</span>
            </div>
        </div>
    )
}

export default SingleCheckoutItem