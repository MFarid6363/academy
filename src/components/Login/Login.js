import React from 'react';
import './Login.css'
import * as bs from 'react-icons/bs';


const Login = (props) => {
    return (
        <form onSubmit={props.login} className='Login'>
            <h3>Member Login</h3>
            <ul>
                <li>
                    <i><bs.BsFillPersonFill/></i>
                    <input onChange={props.accData} id='Login' type='text' placeholder='Username'/>
                </li>
                <li>
                    <i><bs.BsFillLockFill/></i>
                    <input onChange={props.accData} id='Password' type='password' placeholder='Password'/>
                </li>
                <li className='Login__option'>
                    <input type='checkbox'></input>
                    <label>Remember me</label>
                    <input type='checkbox'></input>
                    <label>Forgot password?</label>
                </li>
            </ul>
            {props.wrongPassOrLogin ? <h2 className='Wrong-Data'>Wrong Password or Login</h2>:null}
            <button className='Login__button' disabled={props.disabled} >Login</button>
           
               
            
        </form>
    );
};

export default Login;