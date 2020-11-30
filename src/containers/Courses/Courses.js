import React,{Component} from 'react';
import './Courses.css';
import Course from '../Course/Course'
import FullPageSpinner from '../../components/spinner/fullpagespinner/FullPageSpinner'
import axios from 'axios'


class Courses extends Component {
    
    state = {
       subject:[
           {id:1, name:'Math', participants :0,info:'Math explained in easy language, plus puzzles, games, worksheets and an illustrated dictionary.'},
           {id:2, name:'React',participants :0, info:'Learn How To Build Native Apps For iOS & Android With React Native And Redux! '},
           {id:3, name:'Language',participants :0,info:'Familiarizing students with available ways of autonomous learning of a foreign language and culture'},
           {id:4, name:'Electronics',participants :0,info:'Learn React JS from top-rated instructors. Find the best React courses for your level and needs'},
           {id:5, name:'Sport',participants :0,info:'There is a wide range of courses in the sports sector, from sports science, to performance and sports psychology.'}
        ],
        spinner:false,
        logined:false,
        accountData:{
        }
    }


    
    componentDidMount=()=>{
        const updatedState={
            ...this.state
        }
        updatedState.logined=this.props.location.state.logined
        updatedState.accountData=this.props.location.state.accountData
        updatedState.spinner=true
        this.setState(updatedState)
        axios.get('https://academy-4a97f.firebaseio.com/accounts.json').then((response)=>{
            let stud=[0,0,0,0,0]
            for(let acc in response.data){
                switch(response.data[acc].Subject){
                    case 'Math':
                        stud[0]++;
                        break
                    case 'React':
                        stud[1]++;
                        break
                    case 'Language':
                        stud[2]++;
                        break
                    case 'Electronics':
                        stud[3]++;
                        break
                    case 'Sport':
                        stud[4]++;
                        break
                    default:
                        return null;
                }
            }
            const old={
                ...this.state
            }  
            for(let a=0;a<5;a++){          
            old.subject[a].participants=stud[a]
            }
            old.spinner=false
            this.setState(old)
        })
    }
    
    goToMain=()=>{
        this.setState({spinner:true})
        this.props.history.push({
            pathname:'/',
            state: {logined:this.state.logined,accountData:this.state.accountData}
        }) 
        this.setState({spinner:false})

    }
    goToCourse=(course)=>{
        this.props.history.push({
            pathname:this.props.history.location.pathname+'/'+course.name,
            state: {logined:this.state.logined,accountData:this.state.accountData,course:course}
        }) 
    }
    render () {
        return (
            <div>
                {this.state.spinner ? <FullPageSpinner/>:
                <div className='courses-section' >
                    <header className='course-section__header'>
                        <h1>Amazing Courses</h1>
                        <button className='course-section__button course-section__button--header' onClick={this.goToMain}>Main Page</button>
                    </header>
                    
                    <section className="Courses">
                        {
                            this.state.subject.map( course => {
                                return <Course  goToCourse={()=>this.goToCourse(course)} key={course.id} info={course.info} SubjectName={course.name} Participant={course.participants}/>
                            })
                        }
                    </section>
                </div>
                }
            </div>
        );
    }
}

export default Courses;