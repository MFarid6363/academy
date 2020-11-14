import React from 'react';
import {useHistory} from 'react-router-dom'
import {Link} from 'react-router-dom'
import './particularCoursenav.css'
import AccountBar from '../AccountBar/AccountBar'

const particularCoursenav = (props) => {
    return ( 
        <div className='particularCoursenav' >
          
            {props.logined ? <AccountBar accountName={props.accountName}/> :null}
            <ul > 

                <li className={props.page === 'Main' ? 'isactive' : ''} onClick={()=>props.navigate('Main')} >Main</li>
                <li className={props.page === 'Teacher' ? 'isactive' : ''} onClick={()=>props.navigate('Teacher')} >Teachers</li>
                <li className={props.page === 'Info' ? 'isactive' : ''} onClick={()=>props.navigate('Info')} >Info</li>
                <li className={props.page === 'Contact' ? 'isactive' : ''} onClick={()=>props.navigate('Contact')} >Contact</li>
                <li className={props.page === 'News' ? 'isactive' : ''} onClick={()=>props.navigate('News')} >News</li>
            </ul>
        </div>
    );
};

export default particularCoursenav;