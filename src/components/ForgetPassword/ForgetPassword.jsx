import React, { useState } from 'react'
import style from './ForgetPassword.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function ForgetPassword() {

  let navigate = useNavigate()
  let [email, setEmail] = useState('')

  async function checkemail(email) {
    let response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',{
      'email' : email,
    })
    if(response?.data.statusMsg === 'success'){
     navigate('/forget-password/verify-code')
    }else {
      console.log('error');
      console.log(response);
    }
  }
  return (
<>
<label htmlFor="email">Email</label>
<input onChange={(e) => setEmail(e.target.value)} id='email' name='name' value={email} type="email" />
<button onClick={() => checkemail(email)}>Change Password</button>
</> 


)
}

export default ForgetPassword