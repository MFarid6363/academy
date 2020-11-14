import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import './particularPage.css'

import CourseMain from './particularCourse-Main/partucularCourse-Main';
import CourseNav from '../../components/particularCourseNav/particularCoursenav'
import Teachers from './ParticularCourse-Teachers/ParticularCourse-Teacher'
import CounseInfo from './particularCourse-Info/particularCourseInfo'
import CourseContact from './particularCoursePage-Contact/particularCoursePageContact'
import CourseNews from './particularCoursePage-News/particularCoursePageNews'


class ParticularPage extends Component {
   
    state={
        page:'Main',
        teachers:[]
    }
   
    handleLanguage = (langValue) => {
        this.setState({teachers:langValue})
    }


    navigate=(navigated)=>{
        this.setState({page:navigated})
    }
    render() {
        if(!this.props.history.location.state){
            return <Redirect to={'/'}/>
        }
        console.log(this.props.history)
        return (
            <div>
                <CourseNav  navigate={this.navigate} page={this.state.page} logined={this.props.history.location.state.logined} history={this.props.history} accountName={this.props.history.location.state.accountData ? this.props.history.location.state.accountData.Login : null}/>
                {(() => {
                    switch (this.state.page) {
                        case 'Main':
                            return (
                                <CourseMain onSelectLanguage={this.handleLanguage} history={this.props.history} course={this.props.history.location.pathname.slice(9)}/>
                            )
                        case 'Teacher':
                            return (
                                <Teachers teachers={this.state.teachers}/>
                            )
                        case 'Info':
                            return (
                                <CounseInfo course={this.props.history.location.pathname.slice(9)}/>
                            )
                        case 'News':
                            if(this.props.history.location.state.logined){
                            return (
                                this.props.history.location.state.accountData.Activity ==='Teacher' ? <CourseNews accountData={this.props.history.location.state.accountData} course={this.props.history.location.pathname.slice(9)}/> : <p>To create news you should to be a teacher</p>
                            )}
                            else{
                                return(
                                    <p>To create news you should to be a teacher</p>
                                )
                            }
                        case 'Contact':
                            return (
                                this.props.history.location.state.logined ? <CourseContact accountData={this.props.history.location.state.accountData} course={this.props.history.location.pathname.slice(9)}/> :<div className='Course-Contact__Login-error'>
                                    <p>Go to main page to login</p>            
                                    <div><a href="/">
                                        <p><span className="bg"></span><span className="base"></span><span className="text">Go to main</span></p></a>
                                        <a className="transparent"  onClick={()=>this.setState({page:'Main'})}><p><span className="bg"></span><span className="base"></span><span className="text">Course</span></p></a></div>
                                    </div> 
                            )
                        
                    }
                })()}
            </div>
        );
    }
}

export default ParticularPage;