import React,{useEffect,useState} from 'react';
import axios from 'axios'
import ReactPlayer from "react-player";


const newComp = (props) => {
    const [image,setimage]=useState('')
    useEffect(() => {
        console.log(props.video)
        axios
          .get('https://academy-4a97f.firebaseio.com/accounts.json')
          .then(response =>{
              for(let acc in response.data){
                    if(props.video.Login === response.data[acc].Login && response.data[acc].image[Object.keys(response.data[acc].image)[0]]){
                        setimage(response.data[acc].image[Object.keys(response.data[acc].image)[0]].file)
                    }
                }
          });
    }, [image !== null]);
    return (
        <div className='newcomp'>
            <div className='Client-Image'>
                <img className='Client-Image__Image' src={image ? image : props.video.Gender==='Male' ? require('./img/male.jpg'): require('./img/female.png')} alt='profileimg'/>
            </div>
            <span>{props.video.Name}</span>
            <div className="App">
            <h3>{props.video.Title} <a href={props.video.Link}>go to website</a></h3>
            <ReactPlayer
                url={props.video.Link}
            />
    </div>
        </div>
    );
};

export default newComp;