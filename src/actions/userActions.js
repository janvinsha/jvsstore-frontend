import axios from "axios";

import {USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,

  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,

  USER_DETAILS_REQUEST, 
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,  

  USER_UPDATE_PROFILE_REQUEST, 
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,  

  USER_LIST_REQUEST, 
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,  

  USER_DELETE_REQUEST, 
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,  

  USER_UPDATE_REQUEST, 
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,  

  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_FORGOT_PASSWORD_FAIL,

  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_SUCCESS,
  USER_RESET_PASSWORD_FAIL,

  
  USER_CONFIRM_EMAIL_REQUEST,
  USER_CONFIRM_EMAIL_SUCCESS,
  USER_CONFIRM_EMAIL_FAIL,
    
  USER_RESEND_CONFIRM_EMAIL_REQUEST,
  USER_RESEND_CONFIRM_EMAIL_SUCCESS,
  USER_RESEND_CONFIRM_EMAIL_FAIL,

} from "../constants/userConstants"

axios.defaults.withCredentials=true;
export const login=(email,password)=>async(dispatch)=>{

    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        const config={headers:{'Content-Type':"application/json"}}
        const { data } = await axios.post("https://jvsstoreapi.herokuapp.com/api/v1/users/login",{email,password},config);
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data});
        localStorage.setItem('userInfo',JSON.stringify(data.data))
      } catch (error) {
        dispatch({
          type: USER_LOGIN_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
}
export const logout=()=>async(dispatch)=>{
  try{
  await axios.get("https://jvsstoreapi.herokuapp.com/api/v1/users/logout");
  dispatch({type:USER_LOGOUT})
  localStorage.removeItem('userInfo')
 }
  catch(error){
  }
}
export const getLoggedUserStatus=()=>async(dispatch)=>{
  try {
    const { data } = await axios.get("https://jvsstoreapi.herokuapp.com/api/v1/users/loggedInUser");
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo',JSON.stringify(data.data))
  } catch (error) {
  }
}

export const register=(name,email,password,passwordConfirm)=>async(dispatch)=>{
  try {
      dispatch({ type: USER_REGISTER_REQUEST });
      const config={headers:{'Content-Type':"application/json"}}
      const { data } = await axios.post("https://jvsstoreapi.herokuapp.com/api/v1/users/register",{name,email,password,passwordConfirm},config);
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      localStorage.setItem('userInfo',JSON.stringify(data.data))
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
}


export const getUserDetails=(id)=>async(dispatch)=>{
  try {
      dispatch({ type: USER_DETAILS_REQUEST });
      const { data } = await axios.get(`https://jvsstoreapi.herokuapp.com/api/v1/users/${id}`);
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: USER_DETAILS_FAIL,
        payload: 
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }}
    export const updateUserProfile=(user)=>async(dispatch)=>{

      try {
          dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
          const config={headers:{'Content-Type':"multipart/form-data"}}
          let formData=new FormData()
         if(user.name) formData.append("name",user.name);
         if(user.email)formData.append("email",user.email);
         if (user.photo) formData.append("photo",user.photo);
          const { data } = await axios.patch(`https://jvsstoreapi.herokuapp.com/api/v1/users/updateMe`,formData,config);
          dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
        } catch (error) {
          dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: 
             error.response && error.response.data.message
           ? error.response.data.message
          : error.message,
          });
        }}

        export const updateUserPassword=(user)=>async(dispatch)=>{
          try {
              dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
              const config={headers:{'Content-Type':"application/json"}}
              const { data } = await axios.patch("https://jvsstoreapi.herokuapp.com/api/v1/users/updateMyPassword",user,config);
              dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
            } catch (error) {
              dispatch({
                type: USER_UPDATE_PROFILE_FAIL,
                payload: 
                  error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
              });
            }}

            export const listUsers=(pageNumber)=>async(dispatch)=>{
              try {
                  dispatch({ type: USER_LIST_REQUEST });
                  const { data } = await axios.get(`https://jvsstoreapi.herokuapp.com/api/v1/users/?page=${pageNumber}`);
                  dispatch({ type: USER_LIST_SUCCESS, payload: data });
                } catch (error) {
                  dispatch({
                    type: USER_LIST_FAIL,
                    payload: 
                      error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
                  });
                }}
                export const deleteUser=(id)=>async(dispatch)=>{
                  try {
                      dispatch({ type: USER_DELETE_REQUEST });
                       await axios.delete(`https://jvsstoreapi.herokuapp.com/api/v1/users/${id}`);
                      dispatch({ type: USER_DELETE_SUCCESS });
                    } catch (error) {
                      dispatch({
                        type: USER_DELETE_FAIL,
                        payload: 
                          error.response && error.response.data.message
                            ? error.response.data.message
                            : error.message,
                      });
                    }}

export const updateUser=(user,id)=>async(dispatch)=>{

 try {
  dispatch({ type: USER_UPDATE_REQUEST });
 const config={headers:{'Content-Type':"application/json"}}
 const { data } = await axios.patch(`https://jvsstoreapi.herokuapp.com/api/v1/users/${id}`,user,config);
dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
} catch (error) {
   dispatch({
 type: USER_UPDATE_FAIL,
 payload: 
 error.response && error.response.data.message
 ? error.response.data.message                 
   : error.message,
   });
}}

export const forgotPassword=(email)=>async(dispatch)=>{
  try {
   dispatch({ type: USER_FORGOT_PASSWORD_REQUEST });
  const config={headers:{'Content-Type':"application/json"}}
  await axios.post(`https://jvsstoreapi.herokuapp.com/api/v1/users/forgotPassword`,email,config);
 dispatch({ type: USER_FORGOT_PASSWORD_SUCCESS });
 } catch (error) {
    dispatch({
  type: USER_FORGOT_PASSWORD_FAIL,
  payload: 
  error.response && error.response.data.message
  ? error.response.data.message                 
    : error.message,
    });
 }}

 export const resetPassword=(passwords,resetToken)=>async(dispatch)=>{
  try {
   dispatch({ type: USER_RESET_PASSWORD_REQUEST });
  const config={headers:{'Content-Type':"application/json"}}
  await axios.patch(`https://jvsstoreapi.herokuapp.com/api/v1/users/resetPassword/${resetToken}`,passwords,config);
 dispatch({ type: USER_RESET_PASSWORD_SUCCESS });
 } catch (error) {
    dispatch({
  type: USER_RESET_PASSWORD_FAIL,
  payload: 
  error.response && error.response.data.message
  ? error.response.data.message                 
    : error.message,
    });
 }}


 export const confirmEmail=(confirmToken)=>async(dispatch)=>{
  try {
   dispatch({ type: USER_CONFIRM_EMAIL_REQUEST });
  const config={headers:{'Content-Type':"application/json"}}
  await axios.post(`https://jvsstoreapi.herokuapp.com/api/v1/users/confirmEmail/${confirmToken}`,config);
 dispatch({ type: USER_CONFIRM_EMAIL_SUCCESS });
 } catch (error) {
    dispatch({
  type: USER_CONFIRM_EMAIL_FAIL,
  payload: 
  error.response && error.response.data.message
  ? error.response.data.message                 
    : error.message,
    });
 }}
 
 export const resendConfirmEmail=()=>async(dispatch)=>{
  try {
   dispatch({ type: USER_RESEND_CONFIRM_EMAIL_REQUEST });
  const config={headers:{'Content-Type':"application/json"}}
  await axios.post(`https://jvsstoreapi.herokuapp.com/api/v1/users/resendConfirmEmail/`,config);
 dispatch({ type: USER_RESEND_CONFIRM_EMAIL_SUCCESS });
 } catch (error) {
    dispatch({
  type: USER_RESEND_CONFIRM_EMAIL_FAIL,
  payload: 
  error.response && error.response.data.message
  ? error.response.data.message                 
    : error.message,
    });
 }}