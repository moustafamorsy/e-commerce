import React, { useContext, useEffect, useState } from 'react'
import style from './Wishlist.module.css'
import { wishContext} from '../Context/WishContext'
import { useQuery } from 'react-query'
import { BallTriangle } from 'react-loader-spinner'
import { cartContext } from '../Context/CartContext'
import toast from 'react-hot-toast'


function Wishlist() {

let {getUserwish  , deleteProduct} = useContext(wishContext)
let {addToCart} = useContext(cartContext)

let [wish , setWish]= useState('')

async function deleteSingleProduct(id) {
  let {data} = await deleteProduct(id) ;
  getWish()
  console.log(data);
}
async function getWish() {
  
  let {data} = await getUserwish();
  console.log(data);
  if(data === undefined) {
    setWish('empty')
  }else{
    setWish(data)
  }
 
}
useEffect(() =>{
  getWish();
  
},[])


async function addProduct(productId) {

  let response = await addToCart(productId)
  console.log(response);
  if(response.data.status === 'success') {
    toast.success('product added to your cart' , {
      duration : 3000 ,
      position : 'top-right' ,
    })
    deleteSingleProduct(productId)
  }
  else {
    toast.error('failed to add' , {
      duration : 3000 ,
      position : 'top-right' ,
    })
  }
 }


  return (
<>
{wish  ?
<div className="w-75 my-3 mx-auto p-3 bg-main-light">
  <h3>Wish List</h3>
{wish.data?.map((product) => 
<div key={product?.id} className="row border-bottom py-2 px-2">
  <div className="col-md-1">
  <img className='w-100' src={product.imageCover} alt="" />
  </div>
  <div className="col-md-11">
 <div className="d-flex justify-content-between align-items-center">
  <div>
    <h3 className="h6">
    {product.slug}
    </h3>
    <h6 className="text-main">
      Price : {product.price} EGP
    </h6>
  </div>
  <div>
    <button onClick={() =>  addProduct(product.id)} className=' brder-main p-1 btn'>Add TO Cart</button>
 
  </div>
 </div>
  </div>
  <div>
   <button onClick={() => deleteSingleProduct(product?.id)} className='btn p-0'> <i class="text-danger font-sm fa-solid fa-trash"></i>Remove </button> 
  </div>
</div>

)}
</div> : <div className="w-100 py-5 d-flex justify-content-center">
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
 </div>}

</> 


)
}

export default Wishlist