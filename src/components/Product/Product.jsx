import React, { useContext, useEffect, useState } from 'react'
import style from './Product.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import { BallTriangle } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { cartContext } from '../Context/CartContext'
import toast from 'react-hot-toast';
import { wishContext } from '../Context/WishContext'


function Product() {

let {addToCart} = useContext(cartContext)
let {addTowish , deleteProduct ,  getUserwish} = useContext(wishContext)
 let [wish, setWish] = useState([])
 let[search , setSearch] = useState('')
  function getProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }

  let {data , isLoading , refetch } = useQuery('featuredProducts' , getProducts )

  
    /* cacheTime: 30000, // the amount of time to cache the data before refetch
  refetchOnMount: true, // doesn't refetch after cache if it false
  staleTime: 30000,   // time till change the old data from cache
  refetchInterval: false ,  // how often to refetch the data
  enabled: true, // to manual or automatic fetch data - use refetch on onclick
  */
   async function addProduct(productId) {

    let response = await addToCart(productId)
    console.log(response);
    if(response.data.status === 'success') {
      toast.success('product added to your cart' , {
        duration : 3000 ,
        position : 'top-right' ,
      })
    }
    else {
      toast.error('failed to add' , {
        duration : 3000 ,
        position : 'top-right' ,
      })
    }
   }

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
  
 console.log(search);
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
  <input className='w-100 my-5' onChange={(e) =>setSearch(e.target.value)} type="text" placeholder='Search product' value={search} />
  <div className="row">
    {data?.data.data.filter((product) =>product.slug.toLowerCase().includes(search.toLowerCase())).map((product)=> 
    <div key={product.id}  className='col-md-2'>
     
        <div className="product cursor-pointer py-3 px-2">
        <Link  to={`/product-details/${product.id}`}>   <img src={product.imageCover} alt={product.title} className="w-100" />
          <span className="text-main font-sm fw-bolder">{product.category.name}</span>           <h3 className='h6'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
           <div className="d-flex justify-content-between mt-3">
            <span>{product.price} EGP</span>
            <span><i className='fas fa-star rating-color'>{product.ratingsAverage}</i></span>
           </div>      </Link>
        <i onClick={() => 
        { if(checkWish(product.id)){
          deleteWish(product.id) 
          }else{
            addWish(product.id) 
          }
          
          }} className={ checkWish(product.id) ?"fa-solid fa-heart red" :'fa-solid fa-heart'} ></i>

           <button onClick={() => addProduct(product.id)}  className="btn bg-main text-white w-100 btn-sm mt-2">add to Cart</button>
        </div>
  
    </div>
     )}
  </div>
</div>
}

</> 


)
}

export default Product