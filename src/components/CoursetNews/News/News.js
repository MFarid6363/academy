import React, { Component } from 'react';
import './News.css'
import axios from 'axios'
import NewComp from './new/New'
import Spinner from '../../spinner/fullpagespinner/FullPageSpinner'

class News extends Component {
   state={
       empty:false
   }
    render() {        
        return (
            <div >
                {this.props.empty ? <p className='Empty-page Empty-page-white'>There is no news yet</p>:
                <div className='News'>
                {this.props.news.map((news,index)=>
                    <NewComp course={this.props.course} key={index} newcomp={news}/>
                )}
                </div>
                }
            </div>
        );
    }
}

export default News;