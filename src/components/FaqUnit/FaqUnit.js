import React from 'react'
import './FaqUnit.css'

const FaqUnit = (props) => {
    return (
        <li className="faq-unit">
            <span className="faq-unit__num">{props.num}</span>
            <h2 className="faq-unit__question">{props.question}</h2>
            <p className="faq-unit__answer">{props.answer}</p>
        </li>
    )
}

export default FaqUnit