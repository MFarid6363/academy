import React, { Component } from 'react';
import axios from 'axios'
import Spinner from '../../spinner/spinner'
import {BiCheckCircle}  from "react-icons/bi";

class AddVideo extends Component {
    state={
        spinner:false,
        VideoData:{
            Title:{
                value:'',
                validation:{
                    requeried:true,
                    minLength:3,
                    maxLength:100
                    },
                valid:false,
                touched:false,
            },
            Link:{
                value:'',
                validation:{
                    requeried:true,
                    minLength:1,
                    maxLength:10000
                    },
                valid:false,
                touched:false,
            },
            
        },
        FormValidity:false,
        accountData:this.props.accountData,
        submitNews:true
    }
    componentDidMount(){
        console.log(this.state)
        axios.get('https://academy-4a97f.firebaseio.com/accounts.json').then((response)=>{
            for(let element in response.data){
                let account={
                    ...this.state.accountData
                }
                if(this.state.accountData.Login===response.data[element].Login){
                    account.image=response.data[element].image
                    this.setState({accountData:account})
                }
            }
        })
    }
    submitNews=(event)=>{
        this.setState({spinner:true})
        event.preventDefault()
        let data={
            Login:this.state.accountData.Login,
            Name:this.state.accountData.Name + ' ' + this.state.accountData.Surname,
            Gender:this.state.accountData.Gender,
            Title:this.state.VideoData.Title.value,
            Link:this.state.VideoData.Link.value
        }
        axios.post('https://academy-4a97f.firebaseio.com/courses/'+this.props.course+'/video.json',data).then(()=>{
            this.cleanState()
        })     
        this.setState({spinner:false,submitNews:true}) 
    }
    cleanState(){
        for (let element in this.state.VideoData){
            const updated = {
                ...this.state.VideoData
            } 
            updated[element].valid = false
            updated[element].value = ''                                          
            this.setState({VideoData:updated,FormValidity:false})
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
        this.setState({submitNews:false})
        const updated={
            ...this.state.VideoData
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
            // console.log('bu hammis',updated[inputId].valid)
        }
        
        this.setState({registerData:updated,FormValidity:formIsValid})  
    }
    render() {
        return (
            <div className='AddNews'>
                {
                this.state.spinner ? <Spinner/>:
                <form className='AddNews__Form'>
                    <ul>
                        <li>
                            <label htmlFor='Title'>Title</label>
                            <textarea id='Title' value={this.state.VideoData.Title.value} onChange={(event)=>this.changeHandler(event)} id='Title'/>
                            <label className={this.state.VideoData.Title.valid ? 'Form__validmessage' :'Form__invalidmessage'}>Title should be minimum 5 letters</label>
                        </li>
                        <li>
                            <label  htmlFor='Link'>Link for video</label>
                            <textarea id='Link' value={this.state.VideoData.Link.value} onChange={(event)=>this.changeHandler(event)} id='Link'/> 
                            <label className={this.state.VideoData.Title.valid ? 'Form__validmessage' :'Form__invalidmessage'}>Link can't be empty</label>
                        </li>
                    </ul>
                    <button disabled={!this.state.FormValidity} onClick={(event)=>this.submitNews(event)} className='AddNews__Button'>Publish video</button>
                    {this.state.submitNews ? <h2 className='SubmitedMessage'>Video published <i><BiCheckCircle/></i></h2>: null}
                </form>
                }
            </div>
        );
    }
}

export default AddVideo;