import axios from "axios";
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,

  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,

  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_REQUEST,

  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_REQUEST,

  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_REQUEST,


  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  

  PRODUCT_DELETE_REVIEW_REQUEST,
  PRODUCT_DELETE_REVIEW_SUCCESS,
  PRODUCT_DELETE_REVIEW_FAIL,
 
  PRODUCT_TOP_FAIL,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_REQUEST

} from "../constants/productConstants";
export const listProducts = (keyword="",category="",pageNumber) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    if(category=="all"||category=="")
    {  const { data } = await axios.get(`/api/v1/products/?keyword=${keyword}&page=${pageNumber}`);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  }
   else{ const { data } = await axios.get(`/api/v1/products/?keyword=${keyword}&category=${category}&page=${pageNumber}`);
   dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  }
   
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const listProductDetails=(id)=>async(dispatch)=>{
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/products/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const deleteProduct=(id)=>async(dispatch)=>{

  try {
   dispatch({ type: PRODUCT_DELETE_REQUEST });
  const config={headers:{'Content-Type':"application/json"}}
   await axios.delete(`/api/v1/products/${id}`,config);
 dispatch({ type: PRODUCT_DELETE_SUCCESS});
 } catch (error) {
    dispatch({
  type: PRODUCT_DELETE_FAIL,
  payload: 
  error.response && error.response.data.message
  ? error.response.data.message                 
    : error.message,
    });
 }}

 export const createProduct=(product)=>async(dispatch)=>{

  try {
   dispatch({ type: PRODUCT_CREATE_REQUEST });
   const config={headers:{'Content-Type':"multipart/form-data"}}
   let formData=new FormData()
formData.append("name",product.name);
formData.append("description",product.description);
formData.append("countInStock",product.countInStock);
formData.append("price",product.price);
formData.append("category",product.category);
formData.append("image",product.image);
product.images.map((product)=>(formData.append("images",product)))
 const {data}=  await axios.post(`/api/v1/products/`,formData,config);
 dispatch({ type: PRODUCT_CREATE_SUCCESS,payload:data});
 } catch (error) {
    dispatch({
  type: PRODUCT_CREATE_FAIL,
  payload: 
  error.response && error.response.data.message
  ? error.response.data.message                 
    : error.message,
    });
 }}

 export const updateProduct=(product,id)=>async(dispatch)=>{
  try {
   dispatch({ type: PRODUCT_UPDATE_REQUEST });
   const config={headers:{'Content-Type':"multipart/form-data"}}
   let formData=new FormData()
if(product.name)formData.append("name",product.name);
if(product.description)formData.append("description",product.description);
if(product.countInStock)formData.append("countInStock",product.countInStock);
if(product.price)formData.append("price",product.price);
if(product.category)formData.append("category",product.category);
if(!(Object.entries(product.image).length === 0))formData.append("image",product.image);
if(product.images)product.images.map((product)=>(formData.append("images",product)))
 const {data}=  await axios.patch(`/api/v1/products/${id}`,formData,config);
 dispatch({ type: PRODUCT_UPDATE_SUCCESS,payload:data});
 } catch (error) {
    dispatch({
  type: PRODUCT_UPDATE_FAIL,
  payload: 
  error.response && error.response.data.message
  ? error.response.data.message                 
    : error.message,
    });
 }}

 export const createProductReview=(productId,review)=>async(dispatch)=>{

  try {
   dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });
  const config={headers:{'Content-Type':"application/json"}}
 const {data}=  await axios.post(`/api/v1/products/${productId}/reviews`,review,config);
 dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS,payload:data});
 } catch (error) {
    dispatch({
  type: PRODUCT_CREATE_REVIEW_FAIL,
  payload: 
  error.response && error.response.data.message
  ? error.response.data.message                 
    : error.message,
    });
 }}

 export const deleteProductReview=(reviewId)=>async(dispatch)=>{

  try {
   dispatch({ type: PRODUCT_DELETE_REVIEW_REQUEST });
  const config={headers:{'Content-Type':"application/json"}}
 const {data}=  await axios.delete(`/api/v1/reviews/${reviewId}/`,config);
 dispatch({ type: PRODUCT_DELETE_REVIEW_SUCCESS,payload:data});
 } catch (error) {
    dispatch({
  type: PRODUCT_DELETE_REVIEW_FAIL,
  payload: 
  error.response && error.response.data.message
  ? error.response.data.message                 
    : error.message,
    });
 }}

 export const listTopProducts = () => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_TOP_REQUEST });
    const { data } = await axios.get(`/api/v1/products/top-3-products/`);
     dispatch({ type: PRODUCT_TOP_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_TOP_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };