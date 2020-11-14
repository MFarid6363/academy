import React, { Component } from 'react';
import Login from '../../components/Login/Login'
import Modal from '../../components/UI/MODAL/modal'
import axios from 'axios'
import Spinner from '../../components/spinner/spinner';


class LoginValidation extends Component {
    state={
        spinner:false,
        accountdetails:{},
        accountData:{
            Login:{
                value:'',
                validation:{
                    requeried:true,
                    minLength:3,
                    maxLength:10
                    },
                valid:false,
            },  
            Password:{
                value:'',
                validation:{
                    requeried:true,
                    minLength:3,
                    maxLength:10
                    },
                valid:false,
            }
        },
        image:'',
        validity:false,
        logined:false,
        wrongData:false
    }
    componentDidMount(){
        console.log(this.state.accountData)
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

    getData = (event) => {
        
       const updated = {
           ...this.state.accountData
       }
       const element=event.target
       let updatedelement = {
           ...this.state.accountData[element.id]
       }
       updatedelement.value = element.value
       updatedelement.valid = this.checkValidity(updatedelement.value,updatedelement.validation)
       updated[element.id].value=updatedelement.value
       updated[element.id].valid=updatedelement.valid
       let formIsValid=true
       for(let inputId in updated){
            formIsValid = updated[inputId].valid && formIsValid  //check if all valeus is valid
       }
       
       this.setState({accountData:updated,validity:formIsValid})
    }
    

    logintoAcc = (event) => {
        
        this.setState({spinner:true,wrongData:false})
        axios.get('https://academy-4a97f.firebaseio.com/accounts.json').then(response => {
        let correct=false
        for (const [key] of Object.entries(response.data)) {
            if(this.state.accountData.Login.value===response.data[key].Login){
                if(this.state.accountData.Password.value===response.data[key].Password){
                    console.log('succes login')
                    this.setState({accountdetails:response.data[key]})
                    correct=true
                    break
                }
            }
        }
        this.setState({logined:correct,spinner:false})
        this.props.loginSucces(this.state.logined,this.state.accountdetails,this.state.image); 
        if(!this.state.logined){
            this.setState({wrongData:true})
        } 
        }).catch(()=>this.setState({wrongData:true}))
        this.setState({logined:false})
        this.setState({accountdetails:{}})
    }

    render() {
        return (
        <Modal  modalClosed={this.props.closeLogin} show={this.props.openLogin} >{this.state.spinner ? <Spinner/> : <Login wrongPassOrLogin={this.state.wrongData} disabled={!this.state.validity} accData={ (event) => this.getData(event)} login={this.logintoAcc}/>} </Modal>
        );
    }
}

export default LoginValidation;