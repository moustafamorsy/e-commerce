import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { cartContext} from '../Context/CartContext'
import { useQuery } from 'react-query'
import { BallTriangle } from 'react-loader-spinner'
import { Link } from 'react-router-dom'


function Cart() {

let {getUserCart , deleteAll , updateProduct , deleteProduct} = useContext(cartContext)

let [cart , setCart]= useState('')

async function updateSingleProduct(id , count) {
  let {data} = await updateProduct(id , count) ;
  if(count === 0) {
  deleteSingleProduct(id)
}else{
  setCart(data)
}
}

async function deleteAllItems() {
   let {data} = await deleteAll() ;
   setCart(data.message)
}


async function deleteSingleProduct(id) {
  let {data} = await deleteProduct(id) ;
  setCart(data)
  console.log(data);
}
async function getCart() {
  
  let {data} = await getUserCart();
  console.log(data);
  if(data === undefined) {
    setCart('empty')
  }else{
    setCart(data)
  }
 
}
useEffect(() =>{
  getCart();
  
},[])


  return (
<>
{cart  ?
<div className="w-75 my-3 mx-auto p-3 bg-main-light">
  <h3>Shopping Cart</h3>
  <h4 className='h6 text-main fw-bolder'>Cart Items: {cart.numOfCartItems}</h4>
  <h4 className="h6 mb-4 text-main fw-bolder">Total Cart Price : {cart?.data?.totalCartPrice}</h4>
{cart.data?.products.map((product) => 
<div key={product.product.id} className="row border-bottom py-2 px-2">
  <div className="col-md-1">
  <img className='w-100' src={product.product.imageCover} alt="" />
  </div>
  <div className="col-md-11">
 <div className="d-flex justify-content-between align-items-center">
  <div>
    <h3 className="h6">
    {product.product.title.split(' ').slice(0,3).join('')}
    </h3>
    <h6 className="text-main">
      Price : {product.price} EGP
    </h6>
  </div>
  <div>
    <button onClick={() => updateSingleProduct(product.product.id , product.count + 1 )} className=' brder-main p-1 btn'>+</button>
    <span className='mx-2'>{product.count}</span>
    <button onClick={() => updateSingleProduct(product.product.id , product.count - 1 )} className='btn brder-main p-1'>-</button>
 
  </div>
 </div>
  </div>
  <div>
   <button onClick={() => deleteSingleProduct(product.product.id)} className='btn p-0'> <i class="text-danger font-sm fa-solid fa-trash"></i>Remove </button> 
  </div>
</div>

)}
  {cart.numOfCartItems ? <button onClick={deleteAllItems} className='btn text-danger text-center'>Delete all</button>:  ''}

  {cart.numOfCartItems ? <Link to={'address'} className='btn m-2 bg-main w-25 text-white'>Payment</Link>:  ''}
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

export default Cart