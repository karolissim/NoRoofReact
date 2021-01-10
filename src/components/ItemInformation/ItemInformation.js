import React from 'react'
import {Link} from 'react-router-dom'
import './ItemInformation.css'


const ItemInformation = (props) => {
    var itemQuantityInput
    return (
        <div className="item-container__info">
            <h2>{props.item.name}</h2>
            <p className="author-tag">By NoRoof.</p>
            <div className="additional-info">
                <p><span>Color: <span>{props.item.color}</span></span></p>
                <p><span>Fabric: <span>{props.item.fabric}</span></span></p>
                <p>{props.item.description}</p>
                <p><span>Fit: <span>{props.item.fit}</span></span></p>
                <h2><span>$<span></span>{props.item.price}</span></h2>
                <div className="color_selector">
                    {props.itemColors.map((color, key) => {
                        return (
                            <Link 
                            to={'/shop/' + props.itemId + '/' + color.size_id + '/' + color.color_id}
                            key={key}
                            className="color_selector__color" 
                            style={{ backgroundColor: color.hex, border: '1px solid', borderColor: 'black'}}/>
                        )
                    })}
                </div>
                <div className="selectors">
                    <select id="size-selector" className="size-selector" onChange={props.changeSize}>
                        {props.itemSizes.map((value) => {
                            return <option value={value.size} key={value.size_id}>{value.size}</option>
                        })}
                    </select>
                    <input
                        id="quantity-input"
                        className="size-selector"
                        type="number"
                        pattern="[0-9]*"
                        value={props.userQuantity}
                        ref={((input) => itemQuantityInput = input)}
                        min="1"
                        max={props.itemQuantity}
                        onChange={props.changeQuantity}
                        onBlur={() => {
                            if (itemQuantityInput.value > props.itemQuantity) {
                                props.quantityValidation(props.itemQuantity)
                            } else if (itemQuantityInput.value < 1) {
                                props.quantityValidation(1)
                            } else if (itemQuantityInput.value.includes('e')) {
                                props.quantityValidation(1)
                            }
                        }}></input>
                </div>
                {props.children}
            </div>
        </div>
    )
}

export default ItemInformation