import React from 'react';
import {BiCheckCircle}  from "react-icons/bi";
import './registerComplete.css'

const registerComplete = (props) => {
    return (
        <div className='RegisterComplete'>
            <BiCheckCircle className='RegisterComplete__icon'/>
            <span>Register successfuly complete</span>
            <ul>
                <li><button onClick={props.comRegtoLogin}>Login</button></li>
                <li><button onClick={props.closeCompletedRegister}>Close</button></li>
            </ul>
        </div>
    );
};

export default registerComplete;