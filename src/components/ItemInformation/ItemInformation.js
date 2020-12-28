import React from 'react'
import './ItemInformation.css'

const ItemInformation = (props) => {
    const sizes = props.item.available_size.split(",")
    return(
        <div className="item-container__info">
                <h2>{props.item.name}</h2>
                <p className="author-tag">By NoRoof.</p>
                <div className="additional-info">
                    <p><span>Color: <span>{props.item.color}</span></span></p>
                    <p><span>Fabric: <span>{props.item.fabric}</span></span></p>
                    <p>{props.item.description}</p>
                    <p><span>Fit: <span>{props.item.fit}</span></span></p>
                    <h2><span>$<span></span>{props.item.price}</span></h2>
                    <div className="selectors">
                        <select id="size-selector" className="size-selector" onChange={props.changeSize}>
                            {sizes.map((value) => {
                                return <option value={value} key={props.item.product_id + "_" + value}>{value}</option>
                            })}
                        </select>
                        <input id="quantity-input" className="size-selector" type="number" pattern="[0-9]*" value={props.userQuantity} min="1" max={props.itemQuantity} onChange={props.changeQuantity}></input>
                    </div>
                    {props.children}
                </div>
            </div>
    )
}

export default ItemInformation