import React, { Component } from 'react';
import axios from 'axios'
import CourseAddNews from '../../../components/CoursetNews/AddNews/AddNews'
import News from '../../../components/CoursetNews/News/News'
import './particularCoursePageNews.css'
import Spinner  from '../../../components/spinner/fullpagespinner/FullPageSpinner'

class particularCoursePageNews extends Component {
    state={
        spinner:false,
        news:[],
        empty:false
    }
    componentDidMount(){
        this.setState({spinner:true,empty:false})
        axios.get('https://academy-4a97f.firebaseio.com/courses/' + this.props.course + '/news.json').then((response)=>{
            const news=[]
            if(response.data===null){
                this.setState({empty:true})
            }
            for(let element in response.data){
                news.push(response.data[element])
            }
            this.setState({news:news})
            this.setState({spinner:false})
        })
    }
    render() {
        return (
            <div>
                {this.state.spinner ? <Spinner/>:
                <div  className={this.state.empty ? 'ParticularCourse-news Empty-Content' : 'ParticularCourse-news'}>
                    {this.props.history.location.state.logined ? this.props.history.location.state.accountData.Activity ==='Teacher' ? <CourseAddNews course={this.props.course} accountData={this.props.history.location.state.accountData}/> : null : null}
                    <News course={this.props.course} empty={this.state.empty} news={this.state.news}/>
                </div>
                }
            </div>
        );
    }
}

export default particularCoursePageNews;