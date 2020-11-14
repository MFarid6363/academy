import React from 'react';
import './courseteachers.css'

const courseteachers = (props) => {
    console.log(props.teacher.Gender)
    return (
        <div className='Teacher'>
            <div className='Teacher-Content'>
                <img src={props.teacher.image ? props.teacher.image[Object.keys(props.teacher.image)[0]].file : props.teacher.Gender==='Male' ? require('./img/male.jpg'): require('./img/female.png')} alt='profileimg'/>
                <span className='Teacher-Content__Name-Surname'>{props.teacher.Name} {props.teacher.Surname}</span>
                <span>Login: {props.teacher.Login}</span>
                <span>City: {props.teacher.City}</span>
                <span>Gender: {props.teacher.Gender}</span>
            </div>
        </div>
    );
};

export default courseteachers;
