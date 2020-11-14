import React from 'react';
import './CourseTestimonial.css'
import axios from 'axios'

const CourseTestimonial = (props) => {
    return (
        <div className='Testimonial-container'>
        <div className='Testmonial'>
            <div className='Client-Image'>
                <img className='Client-Image__Image' src={props.AccData.image ? props.AccData.image : props.AccData.gender==='Male' ? require('./img/male.jpg'): require('./img/female.png')} alt='profileimg'/>
            </div>
            <span className='Client__Name' >{props.AccData.Name}</span>
            <span className='Client__Login' >{props.AccData.Login}</span>
            <span className='Client__Type'>{props.AccData.kind}</span>
            <p className='Client__Comment'>{props.AccData.message}</p>
        </div>
    </div>
    );
};

export default CourseTestimonial;