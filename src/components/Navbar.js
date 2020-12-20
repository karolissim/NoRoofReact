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
                    <div class="nav-links">
                        <Link to="/">Shop</Link>
                        <Link to="/faq">FAQ</Link>
                        <Link to="/contact">Contact</Link>
                        <a id="cart-trigger" href="#0">Cart</a>
                    </div>
                </div>
                <div id="shadow-layer"></div>
            </React.Fragment>
        )
    }
}

export default Navbar