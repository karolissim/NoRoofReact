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
                        <Link to="/shop">Shop</Link>
                        <Link to="/faq">FAQ</Link>
                        <Link to="/contact">Contact</Link>
                        <span id="cart-trigger">Cart</span>
                    </div>
                </div>
                <div id="shadow-layer"></div>
            </React.Fragment>
        )
    }
}

export default Navbar