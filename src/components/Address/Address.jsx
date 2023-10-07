import React, { useContext } from 'react'
import style from './Address.module.css'
import { useFormik } from 'formik'
import { cartContext } from '../Context/CartContext'

function Address() {
  let {onlinePayment , cardId} = useContext(cartContext)

 async function handleAddressSubmit(values) {
  console.log(values);
    let response = await onlinePayment(cardId ,values);
    console.log(response);
    window.location.href = response?.data.session.url
  }

  let formik = useFormik({
    initialValues:{
      details:'',
      phone:'',
      city:'',
    },
    onSubmit: handleAddressSubmit,
  })

  return (
<>
<div className="container">
  <form onSubmit={formik.handleSubmit}>
    <label htmlFor="details">Details</label>
    <input name='details' id='details' className='form-control mb-2' type="text" value={formik.values.details} onBlur={formik.handleBlur} onChange={formik.handleChange} />
    <label htmlFor="phone">phone</label>
    <input name='phone' id='phone' className='form-control mb-2' type="tel" value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} />
    <label htmlFor="city">city</label>
    <input name='city' id='city' className='form-control mb-2' type="text" value={formik.values.city} onBlur={formik.handleBlur} onChange={formik.handleChange} />
 <button type='submit' className='btn bg-main text-white'>Pay Now</button>
  </form>
</div>

</> 


)
}

export default Address