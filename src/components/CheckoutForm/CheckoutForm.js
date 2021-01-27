import React, { useState } from 'react'
import './CheckoutForm.css'
import CheckoutFormInput from '../CheckoutFormInput/CheckoutFormInput'
import { SERVER_URL, STRIPE_OPTIONS, CARD_NUMBER, CARD_CVC, CARD_DATE } from '../../constants/Constants'
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { CheckoutFormData, nameInput, surnameInput, cityInput, countryInput, emailInput, postalInput, addressInput, formRefsArray } from '../../constants/CheckoutFormData'
import { validateEmail, validatePostalCode } from '../../utils/Validations'

const CheckoutForm = (props) => {
    const stripe = useStripe()
    const elements = useElements()
    const [isNumberValid, setIsNumberValid] = useState({ isValid: false, isEmpty: true })
    const [isCvcValid, setIsCvcValid] = useState({ isValid: false, isEmpty: true })
    const [isDateValid, setIsDateValid] = useState({ isValid: false, isEmpty: true })
    const [isLoading, setIsLoading] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [countryCode, setCountryCode] = useState('')

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
        formRefsArray.forEach((ref) => {
            if (ref.current.value.length === 0) {
                ref.current.classList.add('invalid')
                errorCount++
            }
        })

        if (countryCode === '') {
            countryInput.current.classList.add('invalid')
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

    function handleCountrySelect(event) {
        setCountryCode(event.target.value)
        countryInput.current.classList.remove('empty')
        countryInput.current.classList.remove('invalid')
    }

    async function handleSubmition() {
        setIsLoading(true)

        if (!stripe || !elements) {
            return
        }

        const cardNumberElement = elements.getElement(CardNumberElement)

        const billingData = {
            address_city: cityInput.current.value,
            address_country: countryCode,
            address_zip: postalInput.current.value,
            address_line1: addressInput.current.value,
            email: emailInput.current.value,
            name: `${nameInput.current.value} ${surnameInput.current.value}`,
            currency: 'eur'
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

        await fetch(SERVER_URL + '/stripe/charge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paymentToken)
        })
    }

    return (
        <div className="checkout-wrapper">
            <div className="section" style={{ marginLeft: '15px', marginRight: '15px' }}>
                <span>SHIPPING DETAILS</span>
                <div className="checkout-divider--gray"></div>
            </div>
            <div className="checkout-modal">
                <form onSubmit={(event) => {
                    event.preventDefault()
                    if (!hasError()) {
                        if (!validateEmail(emailInput.current.value)) {
                            showError({ message: 'Enter correct email' }, false)
                        } else if (!validatePostalCode(countryCode, postalInput.current.value)) {
                            showError({ message: 'Enter correct postal code' }, false)
                        } else if (isNumberValid.isValid && isCvcValid.isValid && isDateValid.isValid) {
                            handleSubmition()
                        }
                    }
                }}>
                    <div data-locale-reversible>
                        {CheckoutFormData.map((row, rowIndex) => {
                            return (
                                <div className="row" key={rowIndex}>
                                    {row.map((input, inputIndex) => {
                                        return (
                                            <CheckoutFormInput
                                                key={inputIndex}
                                                ref={input.ref}
                                                class={input.className}
                                                placeholder={input.placeholder}
                                                label={input.label}
                                                isCountryPicker={input.isCountryPicker}
                                                handleCountrySelect={handleCountrySelect}
                                            />
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                    <div className="section" style={{ marginLeft: '15px', marginRight: '15px' }}>
                        <span>PAYMENT DETAILS</span>
                        <div className="checkout-divider--gray"></div>
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
