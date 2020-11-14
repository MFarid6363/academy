import axios from 'axios';
import React, { Component } from 'react';
import {BiCheckCircle}  from "react-icons/bi";
import { MdCancel } from "react-icons/md";


import './particularCoursePageContact.css'

class particularCoursePageContact extends Component {
    state={
        ContactData:{
            kind:{
                value:'Compliment',
                validation:{},
                valid:true,
                touched:true,
            },
            message:{
                value:'',
                validation:{
                    requeried:true,
                    minLength:5,
                    maxLength:100
                    },
                valid:false,
                touched:false,
            }
        },
        FormValidity:false,
        SubmitedContact:false,
        WrongSubmition:false
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

    getMessage=(event)=>{
        if(this.state.SubmitedContact || this.state.WrongSubmition)
        this.setState({SubmitedContact:false,WrongSubmition:false})
        const updated={
            ...this.state.ContactData
        }
        let updatedFormElement={
            ...updated[event.target.id]
        }
        
        updatedFormElement.value=event.target.value
        updatedFormElement.valid=this.checkValidity(updatedFormElement.value,updatedFormElement.validation)
        updatedFormElement.touched=true
        updated[event.target.id].value=updatedFormElement.value
        updated[event.target.id].valid=updatedFormElement.valid
        let formIsValid=true
        for(let inputId in updated){
            formIsValid = updated[inputId].valid && formIsValid
        }
        this.setState({ContactData:updated,FormValidity:formIsValid}) 
    }
    selected=(event)=>{
        const updated={
            ...this.state.ContactData
        }
        
        updated.kind.value=event.target.innerText
        this.setState({ContactData:updated})
    }
    sendform=(event)=>{
        event.preventDefault()
        this.setState({ kind:'',message:'',validmessage:false,kindvalid:false,})
        if(this.state.FormValidity ){
            const testimonial={
                Login:this.props.accountData.Login,
                Name:this.props.accountData.Name + ' ' + this.props.accountData.Surname,
                gender:this.props.accountData.Gender,
                message:this.state.ContactData.message.value,
                kind:this.state.ContactData.kind.value
            }
            this.setState({SubmitedContact:true})
            axios.post('https://academy-4a97f.firebaseio.com/courses/'+this.props.course+'/testimonials.json',testimonial).then(response=>{
                this.cleanState()
            })

        }
        if(!this.state.FormValidity){
            this.setState({WrongSubmition:true})
        }

        
    }
    cleanState(){
        for (let element in this.state.ContactData){
            const updated = {
                ...this.state.ContactData
            }   
            if(element !== 'kind' ){
                updated[element].valid = false
                updated[element].value = ''
            }
            this.setState({ContactData:updated,FormValidity:false})
        }
        
    }
    render() {
        return (
            <div className='particularCoursePageContact' >
                <h2>Your feedback counts</h2>
                <p>Thank you very much.</p>
                <p>We would really like to know your opininion</p>
                <div className='particularCoursePageContact__Buttons'>
                    <button onClick={(event)=>this.selected(event)} className={this.state.ContactData.kind.value==='Suggestion' ? 'particularCoursePageContact__Button-seleceted-button':null}>Suggestion</button>
                    <button onClick={this.selected} className={this.state.ContactData.kind.value==='Something is not right' ? 'particularCoursePageContact__Button-seleceted-button':null}>Something is not right</button>
                    <button onClick={this.selected}className={this.state.ContactData.kind.value==='Compliment' ? 'particularCoursePageContact__Button-seleceted-button':null}>Compliment</button>
                </div>
                <form className='particularCoursePageContact__Form'>
                    <textarea id='message' value={this.state.ContactData.message.value} onChange={this.getMessage} placeholder='Leave your message here'/>
                    <label className={this.state.ContactData.message.valid  ? 'Form__validmessage' :'Form__invalidmessage'}>message should be at least 20 charachters</label>
                    <button onClick={(event)=>this.sendform(event)}>Submit</button>
                </form>
                {this.state.SubmitedContact ? <h2 className='SubmitedMessage'>Message submited <i><BiCheckCircle/></i></h2>: null}
                {this.state.WrongSubmition ? <h2 className='WrongMessage'>Message is not submited <i><MdCancel/></i></h2>: null}
            </div>
        );
    }
}

export default particularCoursePageContact;