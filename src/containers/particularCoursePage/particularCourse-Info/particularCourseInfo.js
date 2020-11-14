import React, { Component } from 'react';
import './particularCourseInfo.css'
import axios from 'axios'
import Testimonials from '../../../components/CourseTestimonials/CourseTestimonials'
import Spinner from '../../../components/spinner/fullpagespinner/FullPageSpinner'
import spinner from '../../../components/spinner/spinner';

class particularCourseInfo extends Component {
    state={
        info:'',
        testimonials:[],
        spinner:false
    }
    componentDidMount(){
        this.setState({spinner:true})
        axios.get('https://academy-4a97f.firebaseio.com/courses/'+ this.props.course+'.json').then(response=>{
            const update=[]
            Object.keys(response.data.testimonials).map(testimonial=>{
                update.push(response.data.testimonials[testimonial])
            })
            this.setState({info:response.data.info,testimonials:update,spinner:false})
        })
    }
    render() {
        return (
            <div>{this.state.spinner ? <Spinner/>:
                <div className='particularCourseInfo'>
                    <span>About course</span>
                    <p className='particularCourseInfo__Course-info'>{this.state.info}</p>
                    <p className='particularCourseInfo__general'>Advices you different videos which were selected by the teacher it makes you to save time for searching video and avoid you from confusing information.High-quality content makes learning something that you want to do, while low-quality content makes it into a chore and makes it difficult to retain what you’re trying to learn.</p>
                    <Testimonials testimonials={this.state.testimonials}/>
                </div>}
            </div>
        );
    }
}

export default particularCourseInfo;