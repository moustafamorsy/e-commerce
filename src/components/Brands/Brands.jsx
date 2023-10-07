import React from 'react'
import style from './Brands.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import { BallTriangle } from 'react-loader-spinner'

function Templatename() {
  function getCatgories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }

  let {data , isLoading , refetch } = useQuery('allbrands' , getCatgories )


  

  return (
<>

{isLoading ? 
<div className="w-100 py-5 d-flex justify-content-center">
  <BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperClass={{}}
  wrapperStyle=""
  visible={true}
/>
 </div> :
<div className="container py-2">
  <h2 className='text-success text-center py-3 '>All Brands</h2>
  <div className="row g-4">
    {data?.data.data.map((product)=> 
    <div key={product.name}  className='col-md-4'>
     
        <div className="add">
          <div className=''>
         <img src={product.image} alt={product.name} className="heights w-100" />
         </div>
          <div className='text '>
            <p className='text-success h3 text-center'>{product.name}</p>
          </div>
           </div>     
                </div>
  
     )}
  </div>
</div>
}

</> 


)
}

export default Templatename