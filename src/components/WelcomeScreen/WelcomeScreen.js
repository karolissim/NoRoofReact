import React from 'react'
import './WelcomeScreen.css'
import logo from '../../images/logo_reduce.jpg';

const WelcomeScreen = () => {
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

export default WelcomeScreen