import React from 'react';

import './Course.css'

const Course = (props) => {

    return (
        <div className='Course'>
                <img src={require('./img/'+props.SubjectName+'.jpg')} alt={props.SubjectName}></img>
                <span className='Course__subject' onClick={props.goToCourse} >{props.SubjectName}</span>
                <p className='Course__info'>{props.info}</p>
                <span className='Course__Students'>Participants: <span className='Students__number'>{props.Participant}</span></span>
        </div>
    );
};

export default Course;