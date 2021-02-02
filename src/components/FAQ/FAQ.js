import React from 'react'
import FaqUnit from '../FaqUnit/FaqUnit'
import './FAQ.css'
import { FAQ_DATA } from '../../Constants/Constants'

const FAQ = () => {
  return (
    <div id="FAQ" className="faq-screen">
      <div className="faq-list">
        <ol>
          {FAQ_DATA.map((unit) => {
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
