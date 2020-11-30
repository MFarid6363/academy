import React, { Component } from 'react';
import axios from 'axios'
import Video from './Video/Video'
import Spinner from '../../spinner/fullpagespinner/FullPageSpinner'

class Videos extends Component {
    state = {
        videos:[],
        spinner:false
    }
    componentDidMount(){
        this.setState({spinner:true})
        axios.get('https://academy-4a97f.firebaseio.com/courses/' + this.props.course + '/video.json').then((response)=>{
            const videos=[]
            for(let element in response.data){
                videos.push(response.data[element])
            }
            this.setState({videos:videos})
        })
        this.setState({spinner:false})
    }
    render() {    
        return (
            <div >
                {
                this.state.spinner ? <Spinner/>:
                <div className='News'>
                {this.state.videos.map((video,index)=>
                    <Video course={this.props.course} key={index} video={video}/>
                )}
                </div>
                }
                
            </div>
        );
    }
}

export default Videos;