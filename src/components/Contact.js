import React, { Component } from 'react'
import './Contact.css'
import fb_logo from '../images/facebook.png'
import ig_logo from '../images/instagram.png'

class Contact extends Component {
    render() {
        return(
            <React.Fragment>
                <div class="contact-screen">
                    <div class="message-form">
                        <h1 id="Contact">Get in touch with us</h1>
                        <form class="form" action="" method="post">
                            <textarea name="message" rows="10" cols="55"></textarea>
                            <input class="submit-button" type="submit"></input>
                        </form>
                    </div>
                    <div class="social-media">
                        <h3>© 2020 NoRoof. All rights reserved.</h3>
                        <div class="media-links">
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
}

export default Contact