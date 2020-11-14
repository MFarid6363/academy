import React, { Component } from 'react';
import './News.css'
import axios from 'axios'
import NewComp from './new/New'
import Spinner from '../../spinner/fullpagespinner/FullPageSpinner'

class News extends Component {
    state = {
        news:[],
        spinner:false
    }
    componentDidMount(){
        this.setState({spinner:true})
        axios.get('https://academy-4a97f.firebaseio.com/courses/' + this.props.course + '/news.json').then((response)=>{
            const news=[]
            for(let element in response.data){
                news.push(response.data[element])
            }
            this.setState({news:news})
            console.log(this.state.news)
        })
        this.setState({spinner:false})
    }
    render() {    
        
        return (
            <div >
                {
                this.state.spinner ? <Spinner/>:
                <div className='News'>
                {this.state.news.map((news,index)=>
                    <NewComp course={this.props.course} key={index} newcomp={news}/>
                )}
                </div>
                }
                
            </div>
        );
    }
}

export default News;