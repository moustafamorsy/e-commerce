import React, { useContext } from 'react'
import style from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assests/images/freshcart-logo.svg'
import { userContext } from '../Context/Context'
function Templatename() {
  let {token , setToken} = useContext(userContext)
 let navigate = useNavigate()
  function logOut() {
    localStorage.removeItem('token')
    setToken(null);
    navigate('/login');
  }

  return (
<>

<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">
      <img src={logo} alt="logo" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      
      {token ? <><li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="products">products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="wishlist">Wish-list</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="brands">brands</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="cart">cart</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="catgories">catgories</Link>
        </li> </>  : null}
        
        
        
          
      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item d-flex align-items-center">
      <i class="fa-brands fa-facebook-f mx-2"></i>
      <i class="fa-brands fa-twitter mx-2"></i>
      <i class="fa-brands fa-instagram mx-2"></i>
      <i class="fa-brands fa-tiktok mx-2"></i>
      <i class="fa-brands fa-youtube mx-2"></i>
      </li>
 {!token ? <>
      <li className="nav-item">
        <Link className="nav-link" to="login">login</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="register">register</Link>
      </li>  </> :  <li className="nav-item">
        <span onClick={logOut} className="cursor-pointer nav-link">logout</span>
      </li>  
      }
     
    </ul>
    </div>
  </div>
</nav>

</> 


)
}

export default Templatename