import React, { useState } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ThreeDots } from  'react-loader-spinner'

function Register() {
  let navigate = useNavigate();
  const [error ,  setError] = useState(null)
 const [loader , setLoader] = useState(false)

async function submitRegister(values) {

 let {data} = await axios.post( 'https://ecommerce.routemisr.com/api/v1/auth/signup' , values)
 .catch(error => {
setLoader(true)  
  setError(error.response.data.message)
 })
  if(data.message === 'success') {
    setLoader(true) 
    navigate('/login')
  }
}
// function validate(values) {
//   let phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
//   let errors ={};
 
//   if(!values.name){
//     errors.name = 'Empty Field';
//   } else if(values.name.length < 3){
//     errors.name = 'name minlength must be 3'
//   } else if(values.name.length > 10){
//     errors.name = 'max is 10'
//   }
//   if(!values.email){
//     errors.email = 'Empty Field phone';
//   }

//   if(!values.phone){
//     errors.phone = 'Empty Field phone';
//   } else if(!phoneRegex.test(values.phone)){
//     errors.phone = 'name minlength must be 3'
//   } 
//   if(!values.passwords){
//     errors.passwords = 'Empty Field phone';
//   }
//   if(!values.rePasswords){
//     errors.rePasswords = 'Empty Field phone';
//   }

//   return errors;
// }

let validationSchema = yup.object({
  name: yup.string().min(3 , 'min is 3').max(10, 'max is 10').required('pls add field'),
  email:yup.string().email('email is invalid').required('pls add field') ,
  phone: yup.string().required('required') ,
  password : yup.string().matches(/^[A-Z][a-zA-Z0-9]{5,10}$/ , 'passwords is invalid') ,
  rePassword: yup.string().oneOf([yup.ref('password')], 'match password').required('required') ,
})
  let formik = useFormik({
    initialValues: {
      name:'',
      phone:'',
      email:'',
      password:'',
      rePassword:'',
    },validationSchema,
    onSubmit : submitRegister
  })
  return (
<>
<div className="w-75 mx-auto py-5">
 {error ?<div className='alert alert-danger'>{error}</div> : null}
  <h3>Register Now</h3>
<form onSubmit={formik.handleSubmit}>
  <label htmlFor="name">Name : </label>
  <input type='text' id='name' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} className='form-control mb-2' name='name' />
  {formik.errors.name && formik.touched.name? <div className="alert mt-2 p-2 alert-danger">{formik.errors.name}</div> : null}
  <label htmlFor="email">Email : </label>
  <input type='email' id='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className='form-control mb-2' name='email' />
  {formik.errors.email && formik.touched.email? <div className="alert mt-2 p-2 alert-danger">{formik.errors.email}</div> : null}
  <label htmlFor="phone">Phone : </label>
  <input type='tel' id='phone' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} className='form-control mb-2' name='phone' />
  { formik.errors.phone && formik.touched.phone? <div className="alert mt-2 p-2 alert-danger">{formik.errors.phone}</div> : null}
  <label htmlFor="password">Password : </label>
  <input type='password' id='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} className='form-control mb-2' name='password' />
  { formik.errors.password && formik.touched.password? <div className="alert mt-2 p-2 alert-danger">{formik.errors.password}</div> : null}
  <label htmlFor="repassword">repassword : </label>
  <input type='password' id='repassword' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} className='form-control mb-2' name='rePassword' />
  { formik.errors.rePassword && formik.touched.rePassword? <div className="alert mt-2 p-2 alert-danger">{formik.errors.rePassword}</div> : null}

{loader ? <button disabled className='btn bg-main text-white mt-2'>
<ThreeDots 
height="25" 
width="30" 
radius="10"
color="green" 
ariaLabel="three-dots-loading"
wrapperStyle={{}}
wrapperClassName=""
visible={true}
 />
</button> : <button disabled={!( formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white mt-2'>Register</button>
}
</form>

</div>
</> 


)
}

export default Register