import axios from "axios";
import { createContext, useEffect, useState } from "react";


export let cartContext = createContext();

export function CreateContextProvider(props) {

    async function getUserCart(){
    return   axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
        headers :{
            token :localStorage.getItem('token'),
        }
       }).then( (response) => response).catch( (error) => error)
    }

    async function addToCart(productId) {

      return  axios.post('https://ecommerce.routemisr.com/api/v1/cart',{
            productId : productId
        } ,{
            headers :{
                token :localStorage.getItem('token'),
            }
        }).then( (response) => response).catch( (error) => error)
        
    }

    async function deleteProduct(productId) {

        return  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
              headers :{
                  token :localStorage.getItem('token'),
              }
          }).then( (response) => response).catch( (error) => error)
          
      }
      
    async function updateProduct(productId , count) {

        return  axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count},{
              headers :{
                  token :localStorage.getItem('token'),
              }
          }).then( (response) => response).catch( (error) => error)
          
      }
      async function deleteAll() {

        return  axios.delete('https://ecommerce.routemisr.com/api/v1/cart',{
              headers :{
                  token :localStorage.getItem('token'),
              }
          }).then( (response) => response).catch( (error) => error)
          
      }
      async function onlinePayment(cartId , values) {
console.log(values);
console.log(cardId);
        return  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{shippingAddress: values},{
              headers :{
                  token :localStorage.getItem('token'),
              }
          }).then( (response) => response).catch( (error) => error)
          
      }
      let [cardId , setCartId ] = useState(null)
   async function getCartId() {
        let {data} = await getUserCart();
        setCartId(data?.data._id)
        console.log(cardId);
    }
    useEffect(()=>{
        getCartId();
    },[])
    
    return <cartContext.Provider value={{cardId,addToCart,onlinePayment ,deleteAll , updateProduct , getUserCart , deleteProduct}}>
        {props.children}
    </cartContext.Provider>
}