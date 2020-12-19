import React, { Component } from 'react'
import './Home.css'
import logo from '../images/logo.png';

class Home extends Component {
    render() {
        return (
            <div id="NoRoof" className="welcome-screen">
                <div className="welcome-text">
                    <h1>Brand of two friends</h1>
                    <h3>Made with love for everyone's use</h3>
                </div>
                <div className="welcome-image">
                    <img src={logo} alt=""></img>
                </div>
            </div>
        )
    }
}

export default Home