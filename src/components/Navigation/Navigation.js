import React from 'react'
import Navbar from '../Navbar/Navbar'
import Cart from '../Cart/Cart'

const Navigation = (props) => {
    return (
        <React.Fragment>
            <Navbar
                displayCart={props.displayCart}
                shadowState={props.shadowState}
                itemNumber={props.itemNumber}
            />
            <Cart
                modifyItemNum={props.modifyItemNum}
                cartOn={props.cartOn}
                displayCart={props.displayCart}
                item={props.item}
                emptyAddToCartItem={props.emptyAddToCartItem}
                shadow={props.shadow}
                handleCheckout={props.handleCheckout}
                setItemQuantityInCart={props.setItemQuantityInCart}
                changeSnackbarState={props.changeSnackbarState}
            />
        </React.Fragment>
    )
}

export default Navigation