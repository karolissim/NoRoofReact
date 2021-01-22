import React from 'react'
import { SERVER_URL } from '../../constants/Constants'

const SingleCheckoutItem = (props) => {
    const { item } = props
    return (
        <div className="single-item">
            <div className="single-item__image-container">
                <img className="single-item__image" src={SERVER_URL + "/images/" + item.itemId + "/" + item.itemColorId + "/1.jpg"}></img>
            </div>
            <div className="single-item__information">
                <h3>{item.name}</h3>
                <p>{`${item.color} / ${item.size}`}</p>
            </div>
            <div className="single-item__price">
                <p>{item.price * item.quantity}€</p>
            </div>
            <div className="single-item__count">
                <span>{item.quantity}</span>
            </div>
        </div>
    )
}

export default SingleCheckoutItem