import React from 'react'
import style from './CategorySlider.module.css'
import { useQuery } from 'react-query'
import axios from 'axios'
import Slider from "react-slick";


function CategorySlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1
  };


  function getCategory() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }
  let {data , isLoading , isError} = useQuery('categorySlider' , getCategory)
  return (
<>



{data?.data.data? 
<div className='py-3'>
<Slider {...settings}>
 {data.data.data.map((category) => <img height={200} className='w-100' key={category._id} src={category.image} alt={category.name}/>)}
</Slider>
</div>
: ''}
</> 


)
}

export default CategorySlider