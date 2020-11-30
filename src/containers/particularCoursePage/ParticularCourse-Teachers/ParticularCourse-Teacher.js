import React, { Component } from 'react';
import Teacher from '../../../components/courseteachers/courseteachers'
import './ParticularCourse-Teacher.css'

class CourseTeacher extends Component {
    state={
        teacher:this.props.teachers
    }
    render() {
        return (
            <div className= {this.props.teachers.length >= 1 ? 'Course-Teachers' : 'Empty-Teachers'}>
            {
                this.props.teachers.length >= 1  ? 
                this.props.teachers.map((teacher)=>(
                    <Teacher key={teacher.Login} teacher={teacher}/>
                )):<p className='Empty-page Empty-page-red'>There is no teacher in this course</p>
            }
            </div>
        );
    }
}

export default CourseTeacher;