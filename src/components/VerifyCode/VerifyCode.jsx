
import style from './VerifyCode.module.css'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



function ForgetPassword() {

  let navigate = useNavigate()
  let [code, setCode] = useState('')

  async function checkemail(code) {
    let response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',{
      "resetCode" : code,
    })
    console.log(response);
    if(response?.data.status === 'Success'){
     navigate('resetpassword')
    }else {
      console.log('error');
    }
  }
  console.log(code);
  return (
<>
<label htmlFor="code">enter code</label>
<input onChange={(e) => setCode(e.target.value)} id='code' name='code' value={code} type="code" />
<button onClick={() => checkemail(code)}>Change Password</button>
</> 


)
}

export default ForgetPassword