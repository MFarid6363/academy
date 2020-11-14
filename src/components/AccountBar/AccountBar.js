import React, { Component } from 'react';
import './AccountBar.css'
import * as Bs from 'react-icons/bs';
import { ImagePicker } from 'react-file-picker'
import axios from 'axios'


class AccountBar extends Component {
    state={
        file:this.props.image,
        // neededData:''
    }
    
    componentDidMount(){
        
        axios.get('https://academy-4a97f.firebaseio.com/accounts.json').then(response=>{
            for(let accounts in response.data){
                if(this.props.accountName === response.data[accounts].Login){
                    this.setState({neededData:accounts})
                    break
                }
            }
            axios.get('https://academy-4a97f.firebaseio.com/accounts/' + this.state.neededData+'/image.json').then(response=>{
                for(let image in response.data){
                    this.setState({file:response.data[image].file})
                }
            })

        })
        
        
    }
    
    render(){
    
    return (     
        <div className='AccountBar'>
            <ImagePicker
            extensions={['jpg', 'jpeg', 'png']}
            // buttonText="Upload a file!"
            dims={{minWidth: 0, maxWidth: 50000, minHeight: 0, maxHeight: 50000}}
            onChange={(file1) => {
                axios.delete('https://academy-4a97f.firebaseio.com/accounts/'+this.state.neededData+'/image.json').then(()=>{
                this.setState({ file:file1 })
                axios.post('https://academy-4a97f.firebaseio.com/accounts/'+this.state.neededData+'/image.json',this.state)})         
            }}
            onError={error => { alert("that's an error: " + error) }}
            >
            <div className='AccountBar__ImagePicker'>
                <span className='ImagePicker__hover-message'>Set Image</span>
                {this.state.file ? <img className='AccountBar__AccountImage' src={this.state.file} alt={this.state.file}/> : <i className='AccountBar__Icon'><Bs.BsFillPersonFill/></i>}
                <span className='AccountBar__AccountName'>{this.props.accountName}</span>
            </div>
            </ImagePicker>
            
            
        </div>
    );
};
}
export default AccountBar;
