import React from 'react'
import './Contact.css'
import fb_logo from '../../images/facebook.png'
import ig_logo from '../../images/instagram.png'

const Contact = () => {
    return (
        <React.Fragment>
            <div className="contact-screen">
                <div className="message-form">
                    <h1 id="Contact">Get in touch with us</h1>
                    <form className="form" action="" method="post">
                        <textarea name="message" rows="10" cols="55"></textarea>
                        <input className="submit-button" type="submit"></input>
                    </form>
                </div>
                <div className="social-media">
                    <h3>© 2020 NoRoof. All rights reserved.</h3>
                    <div className="media-links">
                        <a href="">
                            <img src={ig_logo} alt=""></img>
                        </a>
                        <a href="">
                            <img src={fb_logo} alt=""></img>
                        </a>
                        <a href="">
                            <img src={ig_logo} alt=""></img>
                        </a>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Contact