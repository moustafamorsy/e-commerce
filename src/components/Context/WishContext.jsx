import axios from "axios";
import { createContext, useState } from "react";


export let wishContext = createContext();

export function WishContextProvider(props) {

  
    async function getUserwish(){
    return   axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{
        headers :{
            token :localStorage.getItem('token'),
        }
       }).then( (response) => response).catch( (error) => error)
    }

    async function addTowish(productId) {

      return  axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',{
            productId : productId
        } ,{
            headers :{
                token :localStorage.getItem('token'),
            }
        }).then( (response) => response).catch( (error) => error)
        
    }

    async function deleteProduct(productId) {

        return  axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
              headers :{
                  token :localStorage.getItem('token'),
              }
          }).then( (response) => response).catch( (error) => error)
          
      }
      
    
    return <wishContext.Provider value={{addTowish  , getUserwish , deleteProduct}}>
        {props.children}
    </wishContext.Provider>
}