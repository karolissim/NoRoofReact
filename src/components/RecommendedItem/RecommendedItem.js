import React from 'react'
import { Link } from 'react-router-dom'
import './ReccomendedItem.css'

const ReccomendedItem = (props) => {
    const item = props.item
    return (
        <div>
            <Link to={"/shop/" + item.product_id + "/" + props.sizeId}>
                <img className="recommended-item__image" src={require("../../images/" + item.product_id + ".jpg").default} alt="item photo"></img>
            </Link>
            <h2 className="recommended-item__title">{item.name}</h2>
            <div className="small-divider"></div>
        </div>
    )
}

export default ReccomendedItem