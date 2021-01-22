import React from 'react'

export const inputRef = React.createRef(null)
export const countryInput = React.createRef(null)
export const addressInput = React.createRef(null)
export const cityInput = React.createRef(null)
export const postalInput = React.createRef(null)
export const nameInput = React.createRef(null)
export const surnameInput = React.createRef(null)
export const emailInput = React.createRef(null)

export const formRefsArray = [
    nameInput,
    surnameInput,
    emailInput,
    addressInput,
    cityInput,
    postalInput
]

export const CheckoutFormData = [
    [
        {
            className: "field half-width",
            ref: nameInput,
            placeholder: 'Tu belekas',
            label: 'First name',
            isCountryPicker: false
        },
        {
            className: "field half-width",
            ref: surnameInput,
            placeholder: 'Myliu',
            label: 'Last name',
            isCountryPicker: false
        },
    ],
    [
        {
            className: "field",
            ref: emailInput,
            placeholder: 'lol@gmail.com',
            label: 'Email',
            isCountryPicker: false
        }
    ],
    [
        {
            className: "field",
            ref: addressInput,
            placeholder: 'Taikos kazkas nkdnk',
            label: 'Address',
            isCountryPicker: false
        }
    ],
    [
        {
            className: "field half-width",
            ref: countryInput,
            placeholder: '',
            label: 'Country',
            isCountryPicker: true
        },
        {
            className: "field quarter-width",
            ref: cityInput,
            placeholder: 'City',
            label: 'Vilnius',
            isCountryPicker: false
        },
        {
            className: "field quarter-width",
            ref: postalInput,
            placeholder: '11111',
            label: 'Postal code',
            isCountryPicker: false
        }
    ]
]
