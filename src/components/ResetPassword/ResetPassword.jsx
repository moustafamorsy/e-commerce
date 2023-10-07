import React , {useState , useContext} from 'react'
import style from './ResetPassword.module.css'
import axios from 'axios';
import { userContext } from '../Context/Context';
import { useNavigate } from 'react-router-dom';
function ResetPassword() {
  let {token} = useContext(userContext);
 
  let navigate = useNavigate()
  let [password, setPassword] = useState({
    email:"",
    newPassword:"",
  })

  async function changePassword(password) {
    return await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',{
      "email" : password.email,
      "newPassword" : password.newPassword,
  
    }).then( (response) =>  navigate('/login')).catch( (error) => console.log(error))
            
  }

  function handleChange(event) {
    setPassword(prevFormData => {
      return {
          ...prevFormData,
          [event.target.name]: event.target.value
      }
  })
  }

  return (
<>

<h1>ResetPassword</h1>
<label htmlFor="email">email</label>
<input onChange={(e) => handleChange(e)} placeholder='email' type="email" name='email' id='email' value={password.email}/>
<label htmlFor="newPassword">newPassword</label>
<input onChange={(e) => handleChange(e)} placeholder='newPassword' type="text" name='newPassword' id='newPassword' value={password.newPassword}/>
<button onClick={() => changePassword(password)}>change</button>
</> 


)
}

export default ResetPassword