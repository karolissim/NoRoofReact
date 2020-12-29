import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'

class Navbar extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="nav">
                    <div className="brand-name">
                        <Link to='/'>NoRoof.</Link>
                    </div>
                    <div className="nav-links">
                        <Link className="link" to={{
                            pathname: '/',
                            hash: '#shop-start'
                        }}>Shop</Link>
                        <Link className="link" to="/faq">FAQ</Link>
                        <Link className="link" to="/contact">Contact</Link>
                        <a id="cart-trigger" onClick = {this.props.displayCart}>Cart <span id="counter-wrapper">(<span id="item-counter">{this.props.itemNumber}</span>)</span></a>
                    </div>
                </div>
                <div id="shadow-layer" className = {this.props.shadowState ? "is-visible" : ""} onClick = {this.props.displayCart}></div>
            </React.Fragment>
        )
    }
}

export default Navbar