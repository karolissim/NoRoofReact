import React from 'react'
import './Checkout.css'
import CheckoutForm from '../CheckoutForm/CheckoutForm'
import CheckoutItems from '../CheckoutItems/CheckoutItems'
import { usePrompt } from '../../utils/usePrompt'

const Checkout = (props) => {
    const { amount, items } = props
    usePrompt(true)
    return (
        <div className="checkout">
            <header className="checkout__header">
                <h1>[LOGO]</h1>
            </header>
            <div className="checkout__container">
                <CheckoutForm
                    amount={amount}
                    items={items} />
                <CheckoutItems
                    amount={amount}
                    items={items} />
            </div>
        </div>
    )
}

export default Checkout