import React from 'react'
import FaqUnit from '../FaqUnit/FaqUnit'
import './FAQ.css'
import { FaqData } from '../../constants/Constants'

const FAQ = () => {
  return (
    <div id="FAQ" className="faq-screen">
      <div className="faq-list">
        <ol>
          {FaqData.map((unit) => {
            return (
              <FaqUnit
                key={unit.num}
                num={unit.num}
                question={unit.question}
                answer={unit.answer} />
            )
          })}
        </ol>
      </div>
    </div>
  )
}

export default FAQ
