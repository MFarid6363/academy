import React from 'react';
import './register.css'


const register = (props) => {  
    return (
          <div className='Register__content'>
                <form onSubmit={props.makeRegistration}>
                    <ul className='content__form'>
                        <li>
                            <label htmlFor='Name'>Name</label>
                            <input id='Name' onChange={props.inputval}></input>
                        </li>
                        <li>
                            <label htmlFor='Surname'>Surname</label>
                            <input id='Surname' onChange={props.inputval}></input>
                        </li>
                        <li>
                            <label htmlFor='Login'>Login</label>
                            <input id='Login' onChange={props.inputval}></input>
                        </li>
                        {props.BusyLogin ? <span className='form_login-busy'>Login already used</span>:<span className='form_login-busy' style={{visibility:'hidden'}}>Login already used</span>}
                        <li>
                            <label htmlFor='Password'>Password</label>
                            <input type='password' id='Password' onChange={props.inputval}></input>
                        </li>
                        <li>
                            <label htmlFor='City'>City</label>
                            <input id='City' onChange={props.inputval}></input>
                        </li>
                        <li>
                            <label htmlFor='Subject'>Subject</label>
                            <select onChange={props.inputval}  id='Subject' className='Register_select'>
                                <option value='Math' id='Math'>Math</option>
                                <option value='React' id='React'>React</option>
                                <option value='Language' id='Language'>Language</option>
                                <option value='Electronics' id='Electronics'>Electronics</option>
                                <option value='Sport' id='Sport'>Sport</option>
                            </select>                        </li>
                        <li>
                            <label htmlFor='Gender' >Gender</label>
                            <select onChange={props.inputval} id='Gender' className='Register_select'>
                                <option value='Male' id='Gender'>Male</option>
                                <option value='Female' id='Gender'>Female</option>
                            </select>
                        </li>   
                        <li>
                            <label htmlFor='Activity' >Activity</label>
                            <select onChange={props.inputval} id='Activity' className='Register_select'>
                                <option value='Student' id='Activity'>Student</option>
                                <option value='Teacher' id='Activity'>Teacher</option>
                            </select>
                        </li>   
                    </ul>
                    <ul className='registor__buttons'>
                        <li><button disabled={props.disabled}>Register</button></li>
                        <li><button onClick={props.cancellRegistration}>Cancel</button></li>
                    </ul>
                </form>
                
            </div>
    );
};

export default register;