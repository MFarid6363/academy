import React, { Component } from 'react';
import './particularCourse-Main.css'
import ReactPlayer from 'react-player'
import axios from 'axios'


import CourseParticipant from '../../../components/Courseparticipant/CourseParticipant'

class Sport extends Component {
    state={
        // teacher:true,
        teachers:[],
        Course:{
            name:this.props.course
        },
        teachersnum:0,
        studentsnum:0
    }
    handleLangChange = () => {
        var lang = this.dropdown.value;
        this.props.onSelectLanguage(lang);            
    }
    componentDidMount(){
        axios.get('https://academy-4a97f.firebaseio.com/accounts.json').then(response=>{
           let studentscount = 0
           let teacherscount = 0
            for(let acc in response.data){
                if(response.data[acc].Subject==this.props.course){
                    switch (response.data[acc].Activity){
                        case 'Teacher':
                            this.state.teachers.push(response.data[acc])
                            teacherscount++
                            break
                        case 'Student':
                            studentscount++
                            break
                        
                    }
                }
            }
            this.setState({teachersnum:teacherscount,studentsnum:studentscount})
        })
        
    }
    componentWillUnmount(){
        this.handleLangChange()
    }
    handleLangChange = () => {
        this.props.onSelectLanguage(this.state.teachers);
    }
    

    render() {
        let accountName=''
        if(this.props.history.location.state.logined ){
            accountName=this.props.history.location.state.accountData.Login.value
        }
        return (
            <div className='Particular-Course' >
                <video controls autoplay>
                    <source src="./video/Red_fody.mp4" type="video/mp4"/>
                </video>
               <h2>{this.props.history.location.state.course.name}</h2> 
               <CourseParticipant participants={this.props.history.location.state.course.participants} studentsnum={this.state.studentsnum} teachersnum={this.state.teachersnum} coursename={this.state.Course.name}/>
            </div>
        );
    }

}

export default Sport;