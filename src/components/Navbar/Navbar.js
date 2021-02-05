import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './Navbar.css'

class Navbar extends Component {
    executeScroll = () => {
        const { location } = this.props;
        if (location.pathname === '/') {
            this.props.shopRef.current.scrollIntoView()
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="nav">
                    <div className="brand-name">
                        <Link to='/' onClick={() => this.props.changeNavSource('home')}>NoRoof.</Link>
                    </div>
                    <div className="nav-links">
                        <Link className="link" to={{
                            pathname: '/',
                            hash: '#shop-start'
                        }} onClick={() => {
                            this.props.changeNavSource('shop')
                            // this.executeScroll()
                        }}>Shop</Link>
                        <Link className="link" to="/faq">FAQ</Link>
                        <a id="cart-trigger" onClick={this.props.displayCart}>Cart <span id="counter-wrapper">(<span id="item-counter">{this.props.itemNumber}</span>)</span></a>
                    </div>
                </div>
                <div id="shadow-layer" className={this.props.shadowState ? "is-visible" : ""} onClick={this.props.displayCart}></div>
            </React.Fragment>
        )
    }
}

export default withRouter(Navbar)