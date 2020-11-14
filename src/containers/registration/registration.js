import React, { Component } from 'react';
import './registration.css'
import Register from '../../components/register/register'
import Modal from './../../components/UI/MODAL/modal'
import Spinner from '../../components/spinner/spinner'
import axios from 'axios'
import RegisterComplete from '../../components/register/registerComplete/registerComplete'

class registration extends Component {
    state={
        spinner:false,
        registerData:{
            Name:{
                value:'',
                validation:{
                    requeried:true,
                    minLength:3,
                    maxLength:10
                    },
                valid:false,
                touched:false,
            },
            Surname:{
                value:'',
                validation:{
                    requeried:true,
                    minLength:3,
                    maxLength:10
                    },
                valid:false,
                touched:false,
            },
            Login:{
                value:'',
                validation:{
                    requeried:true,
                    minLength:3,
                    maxLength:10
                    },
                valid:false,
                touched:false,
            },
            Password:{
                value:'',
                validation:{
                    requeried:true,
                    minLength:3,
                    maxLength:10
                    },
                valid:false,
                touched:false,
            },
            City:{
                value:'',
                validation:{
                    requeried:true,
                    minLength:3,
                    maxLength:10
                    },
                valid:false,
                touched:false,
            },
            Subject:{
                value:'Math',
                validation:{},
                valid:true,
                touched:true,
            },
            Gender:{
                value:'Male',
                validation:{},
                valid:true,
                touched:true,
            },
            Activity:{
                value:'Student',
                validation:{},
                valid:true,
                touched:true,
            }
        },
        image:'',
        FormValidity:false,
        BusyLogin:false
    }
    capitalize = (str) => {
        if (typeof str !== 'string') return ''
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    makeRegistration=()=>{
        this.setState({spinner:true,BusyLogin:false})
        axios.get('https://academy-4a97f.firebaseio.com/accounts.json').then((response)=>{
            console.log(response.data)
            for(let accounts in response.data){
                if(this.state.registerData.Login.value === response.data[accounts].Login){
                    this.setState({BusyLogin:true})
                    break
                }
            }
            if(!this.state.BusyLogin){    
                    this.props.registrSucces(this.state.FormValidity)
                    const account={
                        Name:this.capitalize(this.state.registerData.Name.value),
                        Surname:this.capitalize(this.state.registerData.Surname.value),
                        Login:this.state.registerData.Login.value,
                        Password:this.state.registerData.Password.value,
                        City:this.state.registerData.City.value,
                        Subject:this.state.registerData.Subject.value,
                        Gender:this.state.registerData.Gender.value,
                        Activity:this.state.registerData.Activity.value,
                        image:this.state.image
                    }
                    this.cleanState()
                    console.log(this.state)
                    axios.post('https://academy-4a97f.firebaseio.com/accounts.json',account).then(response=> {
                        this.setState({spinner:false,FormValidity:false})
                        })
                        .catch(()=>{
                            this.setState({spinner:false})
                            console.log('error')}
                        )
            }
            else{
                this.setState({spinner:false,FormValidity:false})
                this.cleanState()
            }
        })
    }
    cleanState(){
        for (let element in this.state.registerData){
            const updated = {
                ...this.state.registerData
            }                                           
            if(element !== 'Gender' && element !=='Subject' && element !=='Activity' ){
                updated[element].valid = false
                updated[element].value = ''
            }
            this.setState({registerData:updated})
        }
    }
    

    checkValidity(value,rules){
        let isValid=true;
        if(rules.requeried){
            isValid=value.trim() !=='' && isValid
        }
        if(rules.minLength){
            isValid=value.length>=rules.minLength && isValid
        }
        if(rules.maxLength){
            isValid=value.length <= rules.maxLength && isValid
        }
        return isValid
    }

     changeHandler=(event)=>{ 
        const updated={
            ...this.state.registerData
        }
        let updatedFormElement={
            ...updated[event.target.id]
        }
        console.log(this.state.registerData.Subject.value)
        
        updatedFormElement.value=event.target.value
        updatedFormElement.valid=this.checkValidity(updatedFormElement.value,updatedFormElement.validation)
        updatedFormElement.touched=true
        updated[event.target.id].value=updatedFormElement.value
        updated[event.target.id].valid=updatedFormElement.valid
        let formIsValid=true
        for(let inputId in updated){
            formIsValid = updated[inputId].valid && formIsValid
            // console.log('bu hammis',updated[inputId].valid)
        }
        
        this.setState({registerData:updated,FormValidity:formIsValid})  
    }
    render() {
        return (
            <div className='Registration__Modal'>
                <Modal modalClosed={this.props.closeRegister} show={this.props.register} >{this.props.registrationComplete ? <RegisterComplete comRegtoLogin={this.props.compRegtoLogin} closeCompletedRegister={this.props.closeCompletedRegister}/> : this.state.spinner ? <Spinner/> : <Register BusyLogin={this.state.BusyLogin} disabled={!this.state.FormValidity} makeRegistration={this.makeRegistration} cancellRegistration={this.props.closeRegister} inputval={(event)=>this.changeHandler(event)}/>}</Modal>
            </div>
        );
    }
}

export default registration;