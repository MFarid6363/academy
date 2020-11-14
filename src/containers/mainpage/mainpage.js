import React, { Component } from 'react';
import Footer from '../../components/footer/footer'
import './MainPage.css';
import Registration from '../registration/registration'
import LoginValidation from '../LoginValidation/LoginValidation';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import AccountBar from '../../components/AccountBar/AccountBar'
// import AcountBar from '../../components/accountbar/accountBar'



class MainPage extends Component {
    state={
        contactVisibility:false,
        loginWindow:false,
        register:false,
        logined:false,
        accountData:{
        },
        image:'',
        registrationComplete:false
    }
    
    componentDidMount=()=>{
        if(this.props.location.state!=null){
            const updated={
                ...this.state
            }
            updated.logined=this.props.location.state.logined
            updated.accountData=this.props.location.state.accountData
            this.setState(updated)
        }

    }
    openUsers=()=>{
        this.props.history.push('/users')
    }
    openRegister=()=>{
        this.setState({
            register:true,
        })
    
    }
    closeRegister=()=>{
        this.setState({
            register:false,
            registrationComplete:false
        })
    }
    
    openLogin=()=>{
        this.setState({
            loginWindow:true
        })
    }
    closeLogin=()=>{
        this.setState({
            loginWindow:false
        })
    }
    makeVisible=()=>{
        this.setState({contactVisibility:true})
    }
    makeInVisible=()=>{
        this.setState({contactVisibility:false})
    }
    openCourses=()=>{
        this.props.history.push({
            pathname:'/courses',
            state: {logined:this.state.logined,accountData:this.state.accountData}
        }) 
        
    }
    loginSucces = (langValue,account,image) => {
        if(langValue){
            this.setState({loginWindow:false,logined:true,accountData:account,image:image})
        }
        console.log(this.state.accountData)
    }
    logOut = () => {
        this.setState({logined:false,accountData:{}})
        this.props.history.replace({
            state:{}
        })
        console.log(this.props.history)

    }
    registrSucces = (registred)=>{
        if(registred){
            this.setState({registrationComplete:true})
        }

    }
    fromcomRegtoLog=()=>{
        this.setState({
            registrationComplete:false,
            register:false,
            loginWindow:true
        })
    }
    
    render() {
        return (
            <div>
                <CSSTransitionGroup
                transitionName="example"
                transitionAppear={true}
                transitionAppearTimeout={3000}
                transitionEnter={true}
                transitionEnterTimeout={3000}
                transitionLeave={false}>
                    <div className='MainPage'>
                        <ul className='MainPage__Navigation'>
                            <li><button onClick={this.openUsers}>Users</button></li>
                            <li><button onClick={this.openCourses}>Courses</button></li>
                            {this.state.logined ? null :<li><button onClick={this.openRegister}>Register</button></li>}
                            {this.state.logined ? <li><AccountBar accountName={this.state.accountData.Login}/></li> : null}
                            <li>{this.state.logined  ?  <button onClick={this.logOut}>Log out</button> : <button onClick={this.openLogin}>Login</button>}</li>
                        </ul>
                        <h1>Welcome to 63 Academy</h1>
                        <Footer className='MainPage__footer' closeContact={this.makeInVisible} contact={this.state.contactVisibility} showContact={this.makeVisible}/>
                        <LoginValidation  logined={this.state.logined} loginSucces={this.loginSucces} closeLogin={this.closeLogin} openLogin={this.state.loginWindow}></LoginValidation>
                        <Registration compRegtoLogin={this.fromcomRegtoLog} closeCompletedRegister={this.closeRegister} registrationComplete={this.state.registrationComplete} registrSucces={this.registrSucces} register={this.state.register} closeRegister={this.closeRegister}/>
                    </div>
                </CSSTransitionGroup>
             </div>
            



               
        );
    }
}

export default  MainPage;