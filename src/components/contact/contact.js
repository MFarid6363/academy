import React from 'react';
import * as FontAwesome from 'react-icons/ai'
import './contact.css'


const contact = () => {
    return (
        <div className='contact__call-numbers'>
            <ul>
                <li>
                    <span>1st office</span>
                    <span>{FontAwesome.AiOutlineMobile} 0707379392</span>
                </li>
                <li>
                    <span>1st office</span>
                    <span>{FontAwesome.AiOutlineMobile} 0707379392</span>
                </li>
                <li>
                    <span>1st office</span>
                    <span>{FontAwesome.AiOutlinePhone} 0707379392</span>
                </li>
            </ul>
        </div>
    );
};

export default contact;