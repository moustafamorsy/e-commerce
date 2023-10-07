import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Helmet} from 'react-helmet';
import { wishContext } from '../Context/WishContext'
import toast from 'react-hot-toast'


function ProductDetails() {
let {id} = useParams()
let {addTowish , deleteProduct ,  getUserwish} = useContext(wishContext)
 let [wish, setWish] = useState([])

  function getProduct(id) {
    console.log(id);
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    
  }

  let {data  } = useQuery('specificProducts' ,() => getProduct(id) , {
    refetchOnWindowFocus: false,
    cacheTime:false,
    refetchInterval:false,
  })
  
  async function addWish(productId) {

    let response = await addTowish(productId)
    console.log(response);
    if(response.data.status === 'success') {
      toast.success('product added to your WishList' , {
        duration : 3000 ,
        position : 'top-right' ,
      })
      getWish()
    }
    else {
      toast.error('failed to add' , {
        duration : 3000 ,
        position : 'top-right' ,
      })
    }
   }

   async function getWish() {
   let {data} = await getUserwish();
  console.log(data);
  if(data === undefined) {
    setWish('empty')
  }else{
    setWish(data?.data)
    console.log(data?.data);
  }
   }
  
 
    useEffect(() =>{
      getWish()
      
    },[])

    function checkWish(id) {
     for (let i = 0; i < wish?.length; i++) {
     if(wish[i]?.id === id) {
      return true
     }
     }
  }

  async function deleteWish(productId) {

    let response = await deleteProduct(productId)
    console.log(response);
    if(response.data.status === 'success') {
      toast.success('product removed from your WishList' , {
        duration : 3000 ,
        position : 'top-right' ,
      })
      getWish()
    }
    else {
      toast.error('failed to remove' , {
        duration : 3000 ,
        position : 'top-right' ,
      })
    }
   }
  return (
<>
<Helmet>
                <meta charSet="utf-8" />
                <title>{data?.data.data.title}</title>
                <meta name="description" content="pages that you can eat from"/>
            </Helmet> 
{data?.data.data ? <div className="row py-2 align-items-center">

<div className="col-md-4">
  <img src={data?.data.data.imageCover} alt={data?.data.data.title} className="w-100" />
</div>

<div className="col-md-8">
  <h2 className="h5">
    {data?.data.data.title}
  </h2>
  <p>{data?.data.data.description}</p>
  <h6 className="text-main">
    {data?.data.data.category?.name}
  </h6>
  <h6 className="text-main">
    Price : {data?.data.data.price} EGP
  </h6>
  <div className="d-flex justify-content-between">
    <span>ratingsQuantity : {data?.data.data.ratingsQuantity }</span>
    <span><i className="fas fa-star rating-color"></i>{data?.data.data.ratingsAverage}</span>
  </div>
  <i onClick={() => 
        { if(checkWish(data?.data.data.id)){
          deleteWish(data?.data.data.id) 
          }else{
            addWish(data?.data.data.id) 
          }
          
          }} className={ checkWish(data?.data.data.id) ?"fa-solid fa-heart red" :'fa-solid fa-heart'} ></i>
  <button className="btn bg-main text-white w-100 mt-2">add to cart</button>
</div>

</div> 

: ''}



</> 


)
}

export default ProductDetails