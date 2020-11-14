import React from 'react';
import './CourseParticipant.css'

const CourseParticipant = (props) => {
    return (
        <div className='CourseParticipant'>
            <h5>{props.coursename}</h5>
            <span>Participants : {props.participants}</span>
            <span>Students : {props.studentsnum}</span>
            <span>Teachers : {props.teachersnum}</span>
        </div>
    );
};

export default CourseParticipant;