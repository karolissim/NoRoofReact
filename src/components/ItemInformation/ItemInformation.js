import React from 'react'
import { Link } from 'react-router-dom'
import './ItemInformation.css'


const ItemInformation = (props) => {
    const { item, itemId, itemColors, itemSizes, userQuantity, itemQuantity } = props
    var itemQuantityInput
    return (
        <div className="item-container__info">
            <h2>{item.name}</h2>
            <p className="author-tag">By NoRoof.</p>
            <div className="additional-info">
                <p><span>Fabric: <span>{item.fabric}</span></span></p>
                <p>{item.description}</p>
                <p><span>Fit: <span>{item.fit}</span></span></p>
                <h2><span>$<span></span>{item.price}</span></h2>
                <div className="color_selector">
                    {itemColors.map((color, key) => {
                        return (
                            <Link
                                to={'/shop/' + itemId + '/' + color.size_id + '/' + color.color_id}
                                key={key}
                                className="color_selector__color"
                                style={{ backgroundColor: color.hex, border: '1px solid', borderColor: 'black' }} />
                        )
                    })}
                </div>
                <div className="selectors">
                    <select id="size-selector" className="size-selector" onChange={props.changeSize}>
                        {itemSizes.map((value) => {
                            return <option value={value.size} key={value.size_id}>{value.size}</option>
                        })}
                    </select>
                    <input
                        id="quantity-input"
                        className="size-selector"
                        type="number"
                        pattern="[0-9]*"
                        value={userQuantity}
                        ref={((input) => itemQuantityInput = input)}
                        min="1"
                        max={itemQuantity}
                        onChange={props.changeQuantity}
                        onBlur={() => {
                            if (itemQuantityInput.value > itemQuantity) {
                                props.quantityValidation(itemQuantity)
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
