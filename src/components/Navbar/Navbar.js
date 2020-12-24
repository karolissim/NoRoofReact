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
                        <Link className="link" to="/shop">Shop</Link>
                        <Link className="link" to="/faq">FAQ</Link>
                        <Link className="link" to="/contact">Contact</Link>
                        <span className="link-span" id="cart-trigger">Cart</span>
                    </div>
                </div>
                <div id="shadow-layer"></div>
            </React.Fragment>
        )
    }
}

export default Navbar