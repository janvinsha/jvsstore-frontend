import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from "react-router-dom";
//Redux
import { useDispatch, useSelector } from "react-redux";

//components

import Loader from "../components/Loader";
import Message from "../components/Message";
//actions
import { register } from "../actions/userActions";
//Styling and Animationimport styled from "styled-components";
import styled from "styled-components";
import { motion } from "framer-motion";
import { pageAnimation } from "../animations";
import Meta from '../components/Meta';

const Register = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const userRegister= useSelector((state) => state.userRegister)
    const userLogin= useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userRegister
    const redirect = location.search ? location.search.split("=")[1] : "/"
  
    useEffect(() => {
      if (userLogin.userInfo) {
        history.push(redirect)
      }
    }, [history, userLogin.userInfo, redirect])
    const submitHandler = (e) => {
      e.preventDefault()
      //Dispatch register
      dispatch(register(name,email, password,passwordConfirm))
    }
    return (  <StyledLogin variants={pageAnimation} initial="hidden" animate="show" exit="exit">
      <Meta title="Register"/>
    {error && <Message variant="danger">{error}</Message>}
    {loading && <Loader />}
    <div class="login">
      <form onSubmit={submitHandler} class="loginForm">
        <h3 class="text-center">Register</h3>
        <div class="form-group">
          <label for="name">Name</label>
          <input class="form-control"
           placeholder="Enter name"
          type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
        </div>
        <div class="form-group">
          <label for="name">Email</label>
          <input class="form-control"
           placeholder="Enter email"
           type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
               {error&&error.includes("email")&&
         <small class="error" >Use another email</small>}
        </div>
        <div class="form-group">
          <label for="name">Password {password.length===0?"":password.length>8?"":<small>Must be more than 8 characters</small>}</label>
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
          <small
          >By continuing, you agree to Janvinsha Store's
        <Link to="/privacy"> Conditions of Use</Link> and
        <Link to="/privacy"> Privacy Notice.</Link></small><br />
          <button type="submit" class="mt-1"
          
          disabled={password.length <=8||passwordConfirm.length<=8||name.length===0||email.length===0||
            password!==passwordConfirm}
          >Register</button>
        </div>
      </form>
    </div>
    <div class="textBtn">
      <small >Already have an account?</small><br />
      <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
        <button class="signBtn" >Login</button>
      </Link>
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