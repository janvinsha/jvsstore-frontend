import React, { useEffect, useState } from 'react';
import {useHistory, useLocation } from "react-router-dom";
//Redux
import { useDispatch, useSelector } from "react-redux";

//components

import Loader from "../components/Loader";
import Message from "../components/Message";
//actions
import { resetPassword} from "../actions/userActions";
//Styling and Animationimport styled from "styled-components";
import styled from "styled-components";
import { motion } from "framer-motion";
import { pageAnimation } from "../animations";
import { USER_RESET_PASSWORD_RESET } from '../constants/userConstants';
import Meta from '../components/Meta';

const Register = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const userLogin= useSelector((state) => state.userLogin)
    const {userInfo}=userLogin
    const userResetPassword= useSelector((state) => state.userResetPassword)
  
    const { loading, error, success } =userResetPassword


    const resetToken = location.pathname.split("/")[2]
    useEffect(() => {
      if (userInfo) {
          history.push("/")
      }else if(success){
        setTimeout(() => {
            dispatch({type:USER_RESET_PASSWORD_RESET})
            history.push("/login")
    }, 2000)
      }else if(error){
        setTimeout(() => {
            dispatch({type:USER_RESET_PASSWORD_RESET})
    }, 2000)
      }
    }, [history, userInfo, resetToken,success,error])
    const submitHandler = (e) => {
      e.preventDefault()
      //Dispatch register
      dispatch(resetPassword( {password,passwordConfirm},resetToken))
    }
    return (  <StyledLogin variants={pageAnimation} initial="hidden" animate="show" exit="exit">
      <Meta title="Reset password"/>
    {error && <Message variant="danger">{error}</Message>}
    {success && <Message>Password changed now login</Message>}
    {loading && <Loader />}
    <div class="login">
      <form onSubmit={submitHandler} class="loginForm">
        <h3 class="text-center">Reset password</h3>
        <div class="form-group">
          <label for="name">New password {password.length===0?"":password.length>8?"":<small>Must be more than 8 characters</small>}</label>
          <input class="form-control" 
           placeholder="Enter password"
          type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </div>
        <div class="form-group">
          <label for="name">Confirm Password{passwordConfirm.length===0?"":passwordConfirm.length>8?"":
          <small>Must be more than 8 characters</small>}</label>
          <input class="form-control"
           placeholder="Enter password again"
           type="password" value={passwordConfirm} 
           onChange={(e) => setPasswordConfirm(e.target.value)} required/>
           {password.length===0||passwordConfirm.length===0?"":
         password!==passwordConfirm?<small class="error" > Passwords are not the same</small>:""}
        </div>
        <div class="text">
    
          <button type="submit" class="mt-1"
          
          disabled={password.length < 8||passwordConfirm.length<8||
            password!==passwordConfirm}
          >Reset password</button>
        </div>
      </form>
    </div>
  </StyledLogin>);
}
 
const StyledLogin = styled(motion.div)`
min-height:81vh;
.login {
  margin: auto;
  width: 25rem;
  margin-top:2rem;
  @media screen and (max-width: 900px) {
  width:100%;
  margin-top:0rem;
    }
  .loginForm {
    @media screen and (max-width: 900px) {
      border-radius: 0px;
    }
  background-color: #1f6f8b;
  padding: 20px 30px;
  border-radius: 10px;
  border: 2px solid grey;
  color: white;
  .text{
      text-align:center;
      button{
          margin-top:0.4rem
      }
  }
  h3{
      text-align:center;
      font-weight:500;
      font-size:1.3rem
  }
  .form-group{
      display:flex;
      flex-flow:column wrap;
      padding:0.5rem 0rem;
      .error{
        color:#f01919;
        
      }
      label{
          padding:0.2rem 0rem;
          small{
            color:#e9cece;
            font-size:0.6rem
          }
      }
  }
  a {
  color: lightblue;
  &:hover{
    color: #b1d1db;
  }
}input{
    border-radius:5px;
    padding:0.5rem;
    border: 1px solid grey;

    
    &:focus{
outline:none;

    }
}
button{
  padding: 8px 20px;
}
}
}
.textBtn{
    text-align:center;
    margin-top:0.2rem;
    button{
  padding: 8px 20px;
  margin-top:0.2rem;

    }
}
`
export default Register;