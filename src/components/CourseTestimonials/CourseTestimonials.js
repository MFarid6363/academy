import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios'

import './CourseTestimonials.css'

import Carousel from 'react-items-carousel';
import * as FontAwesome from "react-icons/fa";
import Testimonial from './courseTestimonial/CourseTestimonial'
import Spinner from '../spinner/fullpagespinner/FullPageSpinner'

const testimonials = (props) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [TestimonialsState, setTestimonials] = useState(null);
  const [spinner, setspinner] = useState(false);

  let updatedTestimoniasl=props.testimonials
  let mySet = new Set();
  
  useEffect(() => {
    let finaltestimonial
    setspinner(true)
    if(props.testimonials.length>1){
    axios
      .get('https://academy-4a97f.firebaseio.com/accounts.json')
      .then(response =>{
        props.testimonials.map((testimonial)=>{
          mySet.add(testimonial.Login)
        })
        for(let acc in response.data){
          if(mySet.has(response.data[acc].Login)){
            
            finaltestimonial = updatedTestimoniasl.map(testimonial=>{
              if(testimonial.Login===response.data[acc].Login && response.data[acc].image[Object.keys(response.data[acc].image)[0]]){
                testimonial.image=response.data[acc].image[Object.keys(response.data[acc].image)[0]].file
              }
              return testimonial;
            })
          }
        }
        setTestimonials(finaltestimonial);
        setspinner(false);
      });
      
  }
  setspinner(false)
  
}, [TestimonialsState !== null]);



    return (
    
        <div>
            {spinner ? <Spinner/> :
            
            TestimonialsState ?
            <div className='Testimonials '>
                
                <div className='Testimonials__Carousel'>
                    
                    <Carousel
                        infiniteLoop={true}
                        slidesToScroll={1}
                        activeItemIndex={activeItemIndex}
                        requestToChangeActive={setActiveItemIndex} 
                        numberOfCards={3}
                        gutter={35}
                        //disableSwipe on touch device? 
                        >
                        {
                        TestimonialsState.map((testi,index)=>{
                          return <Testimonial key={index} AccData={testi}/>
                        })}
                    </Carousel>
                </div>
              
                <div className='Slider-manupulator'>
                    <div>
                        <button  onClick={()=>setActiveItemIndex(activeItemIndex-1)} className='Slider-manupulator__Button  Slider-manupulator__Button_Testimonials  Slider-manupulator__Button_left'>{<FontAwesome.FaLessThan className='falessThan'/>}</button>
                        <button  onClick={()=>{setActiveItemIndex(activeItemIndex+1)}} className='Slider-manupulator__Button  Slider-manupulator__Button_Testimonials  Slider-manupulator__Button_right'>{<FontAwesome.FaGreaterThan className='falessThan'/>}</button>
                    </div>
                </div>
            </div>:<p className='Empty-comments'>There is no Comments</p>
            }
        </div>
    );
};

  

  
// function useWindowDimensions() {
//     function getWindowDimensions() {
//       const { innerWidth: width, innerHeight: height } = window;
//       return {
//         width,
//         height
//       };
//     }
//     const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
//       function handleResize() {
//         setWindowDimensions(getWindowDimensions());
//       }
  
//       window.addEventListener('resize', handleResize);
//       return () => window.removeEventListener('resize', handleResize);
    
  
//     return windowDimensions;
// }
  
  
    
export default testimonials;