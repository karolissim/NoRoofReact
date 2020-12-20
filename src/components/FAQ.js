import react, { Component } from 'react'
import './FAQ.css'

class FAQ extends Component {
    render() {
        return(
            <div id="FAQ" class="faq-screen">
            <div class="faq-image">
              <img src={require('../images/faq.jpg').default} alt=""></img>
            </div>
            <div class="faq-list">
              <ol>
                <li class="item1">
                  <span>01</span>
                  <h2>How long will it take for my order to arrive?</h2>
                  <p>All orders are proceed as fast as possible. The delivery time varies between 2-8 days.</p>
                </li>
                <li class="item2">
                  <span>02</span>
                  <h2>Where do you ship?</h2>
                  <p>At the moment we ship only to European countries.</p>
                </li>
                <li class="item3">
                  <span>03</span>
                  <h2>What payment methods can I use?</h2>
                  <p>You can pay with all major credit cards.</p>
                </li>
                <li class="item4">
                  <span>04</span>
                  <h2>Returns and exchanges</h2>
                  <p>All orders can be returned or exchanged within 14 days. However all shiping expenses are on you.</p>
                </li>
                <li class="item5">
                  <span>05</span>
                  <h2>What if I accidentally gave the wrong address?</h2>
                  <p>Don't worry and drop us a message through the 'Contact' section and we will update your shipping info asap.</p>
                </li>
              </ol>
            </div>
          </div>
        )
    }
}

export default FAQ