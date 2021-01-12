import React from 'react'
import './Checkout.css'
import {loadStripe} from '@stripe/stripe-js'

const stripe = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Checkout = () => {
    return (
        <div className="checkout-wrapper">
            <div className="checkout-modal">
                <form>
                    <div data-locale-reversible>
                        <div className="row">
                            <div className="field">
                                <input id="checkout-adress" class="input empty" type="text" placeholder="Virsuliskiu street 10-23" required=""></input>
                                <label for="checkout-adress">Address</label>
                                <div class="baseline"></div>
                            </div>
                        </div>
                        <div className="row" data-locale-reversible>
                            <div class="field half-width">
                                <input id="checkout-country" class="input empty" type="text" placeholder="Lithuania" required=""></input>
                                <label for="checkout-country">Country</label>
                                <div className="baseline"></div>
                            </div>
                            <div className="field quarter-width">
                                <input id="checkout-city" class="input empty" type="text" placeholder="Vilnius" required=""></input>
                                <label for="checkout-city">City</label>
                                <div className="baseline"></div>
                            </div>
                            <div className="field quarter-width">
                                <input id="checkout-zip" class="input empty" type="text" placeholder="11111" required=""></input>
                                <label for="checkout-zip">POSTAL/ZIP</label>
                                <div className="baseline"></div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="field">
                            <div id="checkout-card-number" className="input empty"></div>
                            <label for="checkout-card-number">Card number</label>
                            <div className="baseline"></div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="field half-width">
                            <div id="checkout-card-expire" className="input empty"></div>
                            <label for="checkout-card-expiry">Expiration</label>
                            <div className="baseline"></div>
                        </div>
                        <div className="field half-width">
                            <div id="checkout-card-cvc" className="input empty"></div>
                            <label for="checkout-card-cvc">CVC</label>
                            <div className="baseline"></div>
                        </div>
                    </div>
                    <button type="submit">Pay $50</button>
                </form>
            </div>
        </div>

    )
}

export default Checkout