import React from 'react';

class CartItem extends React.Component {

    // function imgOnClick() {

    // }

    render() {
        const item = this.props.item;
        return (
            <li className = "cart-item">
                <img className = "cart-preview-photo" src = {item.src} onClick = {}></img>
                <div className = "cart-info">
                    <span hidden = {item.itemId} class = "item-id"></span>
                    <span hidden = {item.itemSizeId} class = "item-size-id"></span>
                    <span hidden = {item.itemColorId} class = "item-color-id"></span>
    
                    <span className = "prdct-name">{item.name}</span>
                    <div className = "color-size-wrapper">
                        <span className = "color-size">{item.color + " " + item.size}</span>
                    </div>
    
                    <div className = "inc-quantity">
                        <a href = "#0" className = "quantity-minus">
                            <span className = "inc-visual"> - </span>
                        </a>
                        <input type = "text" className = "quantity-input"></input>
                        <a href = "#0" className = "quantity-plus">
                            <span className = "inc-visual"> + </span>
                        </a>
                    </div>
    
                    <div className = "price">
                        <span> € </span>
                        <span> {item.price} </span>
                    </div>
    
                    <a href = "#0" className = "item-remove img-replace"></a>
                </div>
            </li>
        )
    }
    
}

export default CartItem
