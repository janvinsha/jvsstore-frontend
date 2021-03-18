import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from "react-router-dom";
//Redux
import { useDispatch, useSelector } from "react-redux";

//components

import Loader from "../components/Loader";
import Message from "../components/Message";
//actions
import { login } from "../actions/userActions";
//Styling and Animationimport styled from "styled-components";
import styled from "styled-components";
import { motion } from "framer-motion";
import { pageAnimation } from "../animations";
import Meta from '../components/Meta';
const Login = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin
  const redirect = location.search ? location.search.split("=")[1] : "/"

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }
  return (<StyledLogin variants={pageAnimation} initial="hidden" animate="show" exit="exit">
      <Meta title="Login"/>
    {error && <Message variant="danger">{error}</Message>}

    {loading && <Loader />}
    <div class="login">
      <form onSubmit={submitHandler} class="loginForm">
        <h3 class="text-center">Login Form</h3>
        <div class="form-group">
          <label for="name">Email</label>
          <input class="form-control"
           placeholder="Enter email"
           type="email"  value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div class="form-group">
          <label for="name">Password</label>
          <input class="form-control" 
           placeholder="Enter password"
          type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div class="text">
          <small
          >By continuing, you agree to Janvinsha Store's
        <Link to="/privacy"> Conditions of Use</Link> and
        <Link to="/privacy"> Privacy Notice.</Link></small><br />
          <button type="submit" class="mt-1">Login</button>
         
        </div>
       <div className="forgot"><Link to="/forgotPassword" > Forgot password?</Link></div> 
      </form>
    </div>
    <div class="textBtn">
      <small >New to Janvinsha Stores?</small><br />
      <Link to={redirect ? `/register?redirect=${redirect}` : 'register'}>
        <button class="signBtn" >Register</button>
      </Link>
    </div>
  </StyledLogin>)
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
  .forgot{
    text-align:center;
    padding:0.4rem 0rem;
  a{
    font-size:0.9rem;
   
  }
  }
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
      label{
          padding:0.2rem 0rem;
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
export default Login;