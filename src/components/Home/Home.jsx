import React from 'react'
import style from './Home.module.css'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'


function Home() {
  return (
<>

<MainSlider />
<CategorySlider/>
<FeaturedProducts/>
</> 


)
}

export default Home