
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Home from './components//Home/Home'
import Layout from './components/Layout/Layout'
import Products from './components/Product/Product'
import Cart from './components/Cart/Cart'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Wishlist from './components/Wishlist/Wishlist'
import NotFound from './components//NotFound/NotFound'
import Catgories from './components/Catgories/Catgories'
import Brands from './components//Brands/Brands'
import { useContext, useEffect } from 'react'
import { userContext } from './components/Context/Context'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import RouteController from './components/routecontroller/routecontroller'
import ProductDetails from './components/ProductDetails/ProductDetails'
import {  Detector } from "react-detect-offline";
import Address from './components/Address/Address'
import Orders from './components/Orders/Orders'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import ResetPassword from './components/ResetPassword/ResetPassword'
import VerifyCode from './components/VerifyCode/VerifyCode'

let routers = createBrowserRouter([
  {path:'/' , element:<Layout/>, children:[
    { index:true , element:<ProtectedRoute><Home/></ProtectedRoute> },
    { path:'cart' , element:<ProtectedRoute><Cart/></ProtectedRoute>},
    { path:'login' , element:<RouteController><Login/></RouteController>},
    { path:'forget-password' , element:<RouteController><ForgetPassword/></RouteController>},
    { path:'forget-password/verify-code' , element:<RouteController><VerifyCode/></RouteController>},
    { path:'forget-password/verify-code/resetpassword' , element:<RouteController><ResetPassword/></RouteController>},
    { path:'products' , element:<ProtectedRoute><Products/></ProtectedRoute>},
    { path:'wishlist' , element:<ProtectedRoute><Wishlist/></ProtectedRoute>},
    { path:'cart/address' , element:<ProtectedRoute><Address/></ProtectedRoute>},
    { path:'product-details/:id' , element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    { path:'catgories' , element:<ProtectedRoute><Catgories/></ProtectedRoute>},
    { path:'allorders' , element:<ProtectedRoute><Orders/></ProtectedRoute>},
    { path:'register' , element:<RouteController><Register/></RouteController>},
    { path:'brands' , element:<ProtectedRoute><Brands/></ProtectedRoute>},
    { path:'*' , element:<NotFound/>},
  ]}
])

function App() {
  let {setToken} = useContext(userContext)
 


  useEffect(()=> {
  if  (localStorage.getItem('token') !== null ){
    setToken(localStorage.getItem('token'))
  }
}, [])


  return (
    <>
  
    <RouterProvider router={routers}></RouterProvider>
  
 <Detector 
 render={({ online }) => (
   <div  className={online ? " " : "warning"}>
      {online  ? '': <div className='network-state'>you are offline</div>}
    </div>
  )} 
/> 
  </>
  )
}

export default App;
