import React,{useEffect,useState} from 'react';
import axios from 'axios'
import './New.css'

const newComp = (props) => {
    const [image,setimage]=useState('')
    useEffect(() => {
        axios
          .get('https://academy-4a97f.firebaseio.com/accounts.json')
          .then(response =>{
              for(let acc in response.data){
                    if(props.newcomp.Login === response.data[acc].Login && response.data[acc].image[Object.keys(response.data[acc].image)[0]]){
                        setimage(response.data[acc].image[Object.keys(response.data[acc].image)[0]].file)
                    }
                }
          });
    }, [image !== null]);
    return (
        <div className='newcomp'>
            <div className='Client-Image'>
                <img className='Client-Image__Image' src={image ? image : props.newcomp.Gender==='Male' ? require('./img/male.jpg'): require('./img/female.png')} alt='profileimg'/>
            </div>
            <span>{props.newcomp.Name}</span>
            <p>{props.newcomp.Title}</p>
            <p>{props.newcomp.Info}</p>
        </div>
    );
};

export default newComp;