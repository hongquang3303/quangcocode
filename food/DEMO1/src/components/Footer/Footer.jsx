import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
 const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt=""/>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit, minima atque perferendis illum beatae tempora harum est autem iure quos. Possimus illo totam rem, suscipit incidunt facere adipisci ducimus nemo.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt=""/>
                    <img src={assets.twitter_icon} alt=""/>
                    <img src={assets.linkedin_icon} alt=""/>
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                <li><a href="/">Home</a></li>
                    <li><a href="/">About Us</a></li>
                    <li><a href="/">Menu</a></li>

                </ul>
            </div>
            <div className="footer-content-right">
                <h2>Get in touch</h2>
                <ul>
                    <li>09982874</li>
                    <li>nguyenquangg3303@gmail.com</li>
                </ul>
                
            </div>
          
        </div>
        <hr/>
        <p className="footer-copyright">Copyright 2024 - Q @ Q FOOD - All Right Reserved.</p>
    </div>
  )
}

export default Footer