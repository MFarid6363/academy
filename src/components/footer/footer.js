import React from 'react';
import './footer.css';
import * as FontAwesome from 'react-icons/ai';
import logo from './img/logo.jpg';
import Contact from '../contact/contact';
const footer = (props) => {
    return (
        <footer className='footer'>
            <div className='our-info'>
                <img className='our-info__logo' src={logo} alt='logo'></img>
                <div className='our-info__about-us '>
                        <ul className='about-us__contact'>
                            <li className='our-info-links'><i>About us</i></li>
                            <li className='our-info-links'><i>Careers</i></li>
                            <li className='our-info-links'onMouseEnter={props.showContact} onMouseLeave={props.closeContact}><i>Contact us</i></li>
                            <li className='our-info-links'><i>Braches</i></li>
                        </ul>
                </div>
                <div className='our-info__social'>
                    <span>FOLLOW US</span>
                    <ul className='social__links'>
                        <li className='our-info-links' ><a href='' ><FontAwesome.AiFillTwitterSquare/></a></li>
                        <li className='our-info-links' ><a href='https://www.facebook.com/farid.murvatov'><FontAwesome.AiFillFacebook/></a></li>
                        <li className='our-info-links' ><a href=''><FontAwesome.AiFillYoutube/></a></li>
                        <li className='our-info-links' ><a href='https://www.instagram.com/faridfrombaku/?hl=ru'><FontAwesome.AiFillInstagram/></a></li>
                    </ul>
                </div>
            </div>
            {props.contact? <Contact/>: null}
            
        </footer>
    );
};

export default footer;