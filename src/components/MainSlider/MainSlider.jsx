import React from 'react'
import style from './MainSlider.module.css'
import Slider from 'react-slick'

import slider1 from '../../assests/images/slider-image-1.jpeg'
import slider2 from '../../assests/images/slider-image-2.jpeg'
import slider3 from '../../assests/images/slider-image-3.jpeg'
import blog1 from '../../assests/images/grocery-banner.png'
import blog2 from '../../assests/images/grocery-banner-2.jpeg'
function MainSlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };

  return (
<>
<div className="row gx-0 mb-3">
  <div className="col-md-9">
    <Slider {...settings}> 
    <img height={400} className='w-100' src={slider1} alt='aya7aga' />
    <img height={400} className='w-100' src={slider2} alt='aya7aga' />
    <img height={400} className='w-100' src={slider3} alt='aya7aga' />
    </Slider>
  </div>
<div className="col-md-3">
 <img height={200}  className='w-100' src={blog1} alt="aya77aga" />
 <img height={200} className='w-100' src={blog2} alt="aya77aga" />
</div>

</div>


</> 


)
}

export default MainSlider