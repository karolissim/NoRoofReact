import { React, useState } from 'react'
import ReactDOM from 'react-dom'
import './CheckoutForm.css'
import { SERVER_URL, STRIPE_OPTIONS, POSTAL_CODE, CARD_NUMBER, CARD_CVC, CARD_DATE } from '../../constants/Constants'
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { validateEmail, validatePostalCode } from '../../utils/Validations'
import { COUNTRIES } from '../../constants/Countries'

const CheckoutForm = (props) => {
    const stripe = useStripe()
    const elements = useElements()
    const [isNumberValid, setIsNumberValid] = useState({ isValid: false, isEmpty: true })
    const [isCvcValid, setIsCvcValid] = useState({ isValid: false, isEmpty: true })
    const [isDateValid, setIsDateValid] = useState({ isValid: false, isEmpty: true })
    const [isLoading, setIsLoading] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    var countryInput, addressInput, cityInput, postalInput, nameInput, surnameInput, emailInput

    function handleOnFocusGained(ref) {
        ReactDOM.findDOMNode(ref).classList.add('focused')
    }

    function handleOnFocusLost(ref) {
        ReactDOM.findDOMNode(ref).classList.remove('focused')
    }

    function handleOnKeyUp(ref) {
        var elementRef = ReactDOM.findDOMNode(ref)
        if (ref.value.length === 0) {
            elementRef.classList.add('empty')
            setShowErrorMessage(false)
        } else {
            elementRef.classList.remove('empty')
            elementRef.classList.remove('invalid')
            setShowErrorMessage(false)
        }
    }

    function handleStripeElementOnChange(isComplete, isEmpty, element) {
        switch (element) {
            case CARD_NUMBER:
                if (isComplete) {
                    setIsNumberValid({ isValid: true, isEmpty: isEmpty })
                } else {
                    setIsNumberValid({ isValid: false, isEmpty: isEmpty })
                }
                break

            case CARD_DATE:
                if (isComplete) {
                    setIsDateValid({ isValid: true, isEmpty: isEmpty })
                } else {
                    setIsDateValid({ isValid: false, isEmpty: isEmpty })
                }
                break

            case CARD_CVC:
                if (isComplete) {
                    setIsCvcValid({ isValid: true, isEmpty: isEmpty })
                } else {
                    setIsCvcValid({ isValid: false, isEmpty: isEmpty })
                }
                break
        }
    }

    function showError(error, completed) {
        if (error != null && !completed) {
            setShowErrorMessage(!completed)
            setErrorMessage(error.message)
        } else if (error == null) {
            setShowErrorMessage(false)
            setErrorMessage('')
        } else if (completed) {
            setShowErrorMessage(!completed)
            setErrorMessage('')
        }
    }

    function hasError() {
        var errorCount = 0
        if (ReactDOM.findDOMNode(nameInput).value.length === 0) {
            ReactDOM.findDOMNode(nameInput).classList.add('invalid')
            errorCount++
        }
        if (ReactDOM.findDOMNode(surnameInput).value.length === 0) {
            ReactDOM.findDOMNode(surnameInput).classList.add('invalid')
            errorCount++
        }
        if (ReactDOM.findDOMNode(emailInput).value.length === 0) {
            ReactDOM.findDOMNode(emailInput).classList.add('invalid')
            errorCount++
        }
        if (ReactDOM.findDOMNode(addressInput).value.length === 0) {
            ReactDOM.findDOMNode(addressInput).classList.add('invalid')
            errorCount++
        }
        if (ReactDOM.findDOMNode(countryInput).value.length === 0) {
            ReactDOM.findDOMNode(countryInput).classList.add('invalid')
            errorCount++
        }
        if (ReactDOM.findDOMNode(cityInput).value.length === 0) {
            ReactDOM.findDOMNode(cityInput).classList.add('invalid')
            errorCount++
        }
        if (ReactDOM.findDOMNode(postalInput).value.length === 0) {
            ReactDOM.findDOMNode(postalInput).classList.add('invalid')
            errorCount++
        }
        if (isNumberValid.isEmpty) {
            document.getElementById('card-number').classList.add('StripeElement--invalid')
            errorCount++
        }
        if (isDateValid.isEmpty) {
            document.getElementById('card-expiry').classList.add('StripeElement--invalid')
            errorCount++
        }
        if (isCvcValid.isEmpty) {
            document.getElementById('card-cvc').classList.add('StripeElement--invalid')
            errorCount++
        }
        if (errorCount > 0) {
            return true
        } else {
            return false
        }
    }

    async function handleSubmition() {
        setIsLoading(true)

        if (!stripe || !elements) {
            return
        }

        const cardNumberElement = elements.getElement(CardNumberElement)

        const billingData = {
            address_city: ReactDOM.findDOMNode(cityInput).value,
            address_country: ReactDOM.findDOMNode(countryInput).value,
            address_zip: ReactDOM.findDOMNode(postalInput).value,
            address_line1: ReactDOM.findDOMNode(addressInput).value,
            email: ReactDOM.findDOMNode(emailInput).value,
            name: `${ReactDOM.findDOMNode(nameInput).value} ${ReactDOM.findDOMNode(surnameInput).value}`,
            currency: 'usd'
        }

        const { error, token } = await stripe.createToken(cardNumberElement, billingData)

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[token]', token);
            stripeTokenHandler(token)
        }
    }

    const stripeTokenHandler = async (token) => {
        const paymentToken = { token: token.id, amount: props.amount * 100 }

        const response = await fetch(SERVER_URL + '/stripe/charge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paymentToken)
        })

        console.log(response)
    }

    return (
        <div className="checkout-wrapper">
            <div className="checkout-modal">
                <form onSubmit={(event) => {
                    event.preventDefault()
                    if (!hasError()) {
                        if (!validateEmail(ReactDOM.findDOMNode(emailInput).value)) {
                            showError({ message: 'Enter correct email' }, false)
                        } else if (!validatePostalCode('LT', ReactDOM.findDOMNode(postalInput).value)) {
                            showError({ message: 'Enter correct postal code' }, false)
                        } else if (isNumberValid.isValid && isCvcValid.isValid && isDateValid.isValid) {
                            handleSubmition()
                        }
                    }
                }}>
                    <div data-locale-reversible>
                        <div className="row">
                            <div className="field half-width">
                                <input
                                    className="input empty"
                                    type="text"
                                    placeholder="Tu belekas"
                                    ref={(name) => nameInput = name}
                                    onFocus={() => handleOnFocusGained(nameInput)}
                                    onBlur={() => handleOnFocusLost(nameInput)}
                                    onKeyUp={() => handleOnKeyUp(nameInput)}>
                                </input>
                                <label className="info-label">First name</label>
                                <div className="baseline"></div>
                            </div>
                            <div className="field half-width">
                                <input
                                    className="input empty"
                                    type="text"
                                    placeholder="Myliu"
                                    ref={(surname) => surnameInput = surname}
                                    onFocus={() => handleOnFocusGained(surnameInput)}
                                    onBlur={() => handleOnFocusLost(surnameInput)}
                                    onKeyUp={() => handleOnKeyUp(surnameInput)}>
                                </input>
                                <label className="info-label">Last name</label>
                                <div className="baseline"></div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="field">
                                <input
                                    className="input empty"
                                    type="text"
                                    placeholder="senitoksgrazus@gmail.com"
                                    ref={(email) => emailInput = email}
                                    onFocus={() => handleOnFocusGained(emailInput)}
                                    onBlur={() => handleOnFocusLost(emailInput)}
                                    onKeyUp={() => handleOnKeyUp(emailInput)}>
                                </input>
                                <label className="info-label">Email</label>
                                <div className="baseline"></div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="field">
                                <input
                                    className="input empty"
                                    type="text"
                                    placeholder="pats geriausias"
                                    ref={(address) => addressInput = address}
                                    onFocus={() => handleOnFocusGained(addressInput)}
                                    onBlur={() => handleOnFocusLost(addressInput)}
                                    onKeyUp={() => handleOnKeyUp(addressInput)}>
                                </input>
                                <label className="info-label">Address</label>
                                <div className="baseline"></div>
                            </div>
                        </div>
                        <div className="row" data-locale-reversible>
                            <div className="field half-width">
                                <input
                                    className="input empty"
                                    type="text"
                                    placeholder="Lithuania"
                                    ref={(country) => countryInput = country}
                                    onFocus={() => handleOnFocusGained(countryInput)}
                                    onBlur={() => handleOnFocusLost(countryInput)}
                                    onKeyUp={() => handleOnKeyUp(countryInput)}>
                                </input>
                                <label className="info-label">Country</label>
                                <div className="baseline"></div>
                            </div>
                            <div className="field quarter-width">
                                <input
                                    className="input empty"
                                    type="text"
                                    placeholder="Vilnius"
                                    ref={(city) => cityInput = city}
                                    onFocus={() => handleOnFocusGained(cityInput)}
                                    onBlur={() => handleOnFocusLost(cityInput)}
                                    onKeyUp={() => handleOnKeyUp(cityInput)}>
                                </input>
                                <label className="info-label">City</label>
                                <div className="baseline"></div>
                            </div>
                            <div className="field quarter-width">
                                <input
                                    className="input empty"
                                    type="text"
                                    placeholder="11111"
                                    ref={(postal) => postalInput = postal}
                                    onFocus={() => handleOnFocusGained(postalInput)}
                                    onBlur={() => handleOnFocusLost(postalInput)}
                                    onKeyUp={() => handleOnKeyUp(postalInput, POSTAL_CODE)}>
                                </input>
                                <label className="info-label">POSTAL/ZIP</label>
                                <div className="baseline"></div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="field half-width">
                            <CardNumberElement id="card-number" options={STRIPE_OPTIONS} className="input" onChange={(event) => {
                                handleStripeElementOnChange(event.complete, event.error, CARD_NUMBER)
                                showError(event.error, event.complete)
                            }} />
                            <label className="payment-label">Card number</label>
                            <div className="baseline"></div>
                        </div>
                        <div className="field quarter-width">
                            <CardExpiryElement id="card-expiry" options={STRIPE_OPTIONS} className="input" onChange={(event) => {
                                handleStripeElementOnChange(event.complete, event.error, CARD_DATE)
                                showError(event.error, event.complete)
                            }} />
                            <label className="payment-label">MM/YY</label>
                            <div className="baseline"></div>
                        </div>
                        <div className="field quarter-width">
                            <CardCvcElement id="card-cvc" options={STRIPE_OPTIONS} className="input" onChange={(event) => {
                                handleStripeElementOnChange(event.complete, event.error, CARD_CVC)
                                showError(event.error, event.complete)
                            }} />
                            <label className="payment-label">CVC</label>
                            <div className="baseline"></div>
                        </div>
                    </div>
                    <button type="submit" disabled={!stripe}>Pay €{props.amount}</button>
                    <div className="checkout-modal__error">
                        {showErrorMessage
                            ? (
                                <span className="checkout-modal__error-message"><i className="fa fa-times-circle"></i> {errorMessage}</span>)
                            : (
                                <span></span>
                            )
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CheckoutForm
