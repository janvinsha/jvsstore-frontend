import axios from "axios";
import {
CART_ADD_ITEM,CART_REMOVE_ITEM,CART_SAVE_SHIPPING_ADDRESS,CART_SAVE_PAYMENT_METHDD
} from "../constants/cartConstants";

export const addToCart=(id,qty)=>async(dispatch,getState)=>{
const {data}=await axios.get(`/api/v1/products/${id}`)
dispatch({
    type:CART_ADD_ITEM,
    payload:{
        product:data.data._id,
        name:data.data.name,
        image:data.data.image,
        price:data.data.price,
        countInStock:data.data.countInStock,
        qty
    }
})
localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
}
export const removeFromCart=(id)=>async(dispatch,getState)=>{

dispatch({type:CART_REMOVE_ITEM,payload:id})

localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}
 
export const saveShippingAddress=(data)=>async(dispatch)=>{

    dispatch({type:CART_SAVE_SHIPPING_ADDRESS,
        payload:data})
    
    localStorage.setItem('shippingAddress',JSON.stringify(data))
    }


    export const savePaymentMethod=(data)=>async(dispatch)=>{

        dispatch({type:CART_SAVE_PAYMENT_METHDD,
            payload:data})
        
        localStorage.setItem('paymentMethod',JSON.stringify(data))
        }
      
        