import React from 'react'
import { Link } from 'react-router-dom'
import './ReccomendedItem.css'
import {SERVER_URL} from '../../constants/Constants'

const ReccomendedItem = (props) => {
    const item = props.item
    return (
        <div>
            <Link to={"/shop/" + item.product_id + "/" + props.sizeId + "/" + props.colorId}>
                <img className="recommended-item__image" src={SERVER_URL + "/images/" + item.product_id + "/" + props.colorId + "/1.jpg"} alt="item photo"></img>
            </Link>
            <h2 className="recommended-item__title">{item.name}</h2>
            <div className="small-divider"></div>
        </div>
    )
}

export default ReccomendedItem