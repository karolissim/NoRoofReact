import React from 'react'

export const FAQ_DATA = [
  {
    num: '01',
    question: 'How long will it take for my order to arrive?',
    answer: 'All orders are proceed as fast as possible. The delivery time varies between 2-8 days.'
  },
  {
    num: '02',
    question: 'Where do you ship?',
    answer: 'At the moment we ship only to European countries.'
  },
  {
    num: '03',
    question: 'What payment methods can I use?',
    answer: 'You can pay with all major credit cards.'
  },
  {
    num: '04',
    question: 'Returns and exchanges',
    answer: 'All orders can be returned or exchanged within 14 days. However all shiping expenses are on you.'
  },
  {
    num: '05',
    question: 'What if I accidentally gave the wrong address?',
    answer: "Don't worry and drop us a message through the 'Contact' section and we will update your shipping info asap."
  }
]

export const PREV = "PREV"
export const NEXT = "NEXT"

export const SERVER_URL = "http://localhost:3030"

export const COLORS = [
  '131,209,104',
  '255,165,191',
  '107,204,241',
  '237,185,104',
  '197,177,213',
  '194,226,96',
  '255,225,93',
  '255, 0, 0',
  '0, 217, 255',
  '255, 115, 0',
  '236, 118, 187',
  '0, 0, 0'
]

export const ADD_TO_CART_BUTTON_STATE = [
  {
    style: 'add-to-cart-button unavailable',
    text: 'OUT OF STOCK',
    isDisabled: true
  },
  {
    style: 'add-to-cart-button available',
    text: 'ADD TO CART',
    isDisabled: false
  }
]

export const STRIPE_OPTIONS = {
  style: {
      base: {
          color: '#32325d',
          fontFamily: '"Rubik", sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
              color: '#fff'
          }
      },
      invalid: {
          color: '#fa755a',
          iconColor: '#fa755a'
      }
  }
}

export const CARD_NUMBER = "CARD_NUMBER"
export const CARD_CVC = "CARD_CVC"
export const CARD_DATE = "CARD_DATE"

export const POSTAL_CODE = "postalCode"

export const shopRef = React.createRef()
