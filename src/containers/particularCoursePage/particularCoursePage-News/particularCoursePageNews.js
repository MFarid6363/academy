import React, { Component } from 'react';
import CourseAddNews from '../../../components/CoursetNews/AddNews/AddNews'
import News from '../../../components/CoursetNews/News/News'
import './particularCoursePageNews.css'

class particularCoursePageNews extends Component {
    state={
        
    }
    render() {
        console.log(this.props)
        return (
            <div className='ParticularCourse-news'>
                <News course={this.props.course}/>
                {this.props.accountData.Activity==='Teacher' ?<CourseAddNews course={this.props.course} accountData={this.props.accountData}/> :null }
            </div>
        );
    }
}

export default particularCoursePageNews;