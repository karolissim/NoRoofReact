import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'

class Navbar extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="nav">
                    <div className="logo">
                        <Link to='/'>NoRoof.</Link>
                    </div>
                    <div className="nav-links">
                        <Link to="/">Shop</Link>
                        <Link to="/faq">FAQ</Link>
                        <Link to="contact">Contact</Link>
                        <a id="cart-trigger" href="#0" onClick = {this.props.displayCart}>Cart <span id="counter-wrapper">(<span id="item-counter">{this.props.itemNumber}</span>)</span></a>
                    </div>
                </div>
                <div id="shadow-layer" className = {this.props.shadowState ? "is-visible" : ""} onClick = {this.props.displayCart}></div>
            </React.Fragment>
        )
    }


}

export default Navbar