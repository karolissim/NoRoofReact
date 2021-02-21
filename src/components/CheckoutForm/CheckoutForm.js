import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './CheckoutForm.css'
import CheckoutFormInput from '../CheckoutFormInput/CheckoutFormInput'
import { SERVER_URL, STRIPE_OPTIONS, CARD_NUMBER, CARD_CVC, CARD_DATE } from '../../Constants/Constants'
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { CheckoutFormData, nameInput, surnameInput, cityInput, countryInput, emailInput, postalInput, addressInput, formRefsArray } from '../../Constants/CheckoutFormData.js'
import { validateEmail, validatePostalCode } from '../../utils/Validations'
import { api } from '../../api/Api'
import { usePrompt } from '../../utils/usePrompt'

const CheckoutForm = (props) => {
    const localStorage = window.localStorage
    const stripe = useStripe()
    const elements = useElements()
    const history = useHistory()
    const [isNumberValid, setIsNumberValid] = useState({ isValid: false, isEmpty: true })
    const [isCvcValid, setIsCvcValid] = useState({ isValid: false, isEmpty: true })
    const [isDateValid, setIsDateValid] = useState({ isValid: false, isEmpty: true })
    const [isLoading, setIsLoading] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [countryCode, setCountryCode] = useState('')
    const [showPrompt, setShowPrompt] = useState(true)
    usePrompt(showPrompt)

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
            default:
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
        showError({ message: '' }, true)
        setIsLoading(true)

        if (!stripe || !elements) {
            return
        }

        const shippingInfo = {
            address: {
                line1: addressInput.current.value,
                city: cityInput.current.value,
                country: countryCode,
                postal_code: postalInput.current.value
            },
            name: `${nameInput.current.value} ${surnameInput.current.value}`
        }

        try {
            const { data } = await api.post(`${SERVER_URL}/stripe/charge`,
                {
                    shipping: shippingInfo,
                    email: emailInput.current.value,
                    amount: props.amount * 100
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )

            const { error, paymentIntent } = await stripe.confirmCardPayment(data.client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        address: shippingInfo.address,
                        email: emailInput.current.value,
                        name: `${nameInput.current.value} ${surnameInput.current.value}`
                    }
                }
            })

            if (error) {
                if (error.type === 'card_error') {
                    setIsLoading(false)
                    showError({ message: error.message }, false)
                }
            } else if (paymentIntent.status === 'succeeded') {
                setShowPrompt(false)
                localStorage.clear()
                setTimeout(() => history.push('/checkout/success'), 500)
            }

        } catch (error) {
            console.log(error)
        }
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
