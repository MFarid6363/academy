import React, { Component } from 'react';
import Teacher from '../../../components/courseteachers/courseteachers'
import './ParticularCourse-Teacher.css'

class CourseTeacher extends Component {
    
    render() {
        return (
            <div className='Course-Teachers'>
            {
                this.props.teachers.map((teacher)=>(
                    <Teacher key={teacher.Login} teacher={teacher}/>
                ))
            }
            </div>
        );
    }
}

export default CourseTeacher;