import React, { useEffect ,useState} from "react";
import { Link,useHistory,useLocation } from "react-router-dom";
//Redux
import { useDispatch, useSelector } from "react-redux";
//components


import Loader from "../components/Loader";
import Message from "../components/Message";

//actions

import { createProduct } from "../actions/productActions";
//Styling and Animationimport styled from "styled-components";
import styled from "styled-components";
import { motion } from "framer-motion";

import { pageAnimation } from "../animations";

import Meta from "../components/Meta";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";


const AdminProductCreate = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const pathname=location.pathname
    const userId=pathname.split("/")[3]
    const history = useHistory()
    const userLogin=useSelector((state)=>state.userLogin)
    const {userInfo}=userLogin;
    //
    const [name, setName] = useState('')
    const [price, setPrice] = useState(Number)
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [countInStock, setCountInStock] = useState(Number)
    const [image, setImage] = useState({})
    const [images, setImages] = useState([])
    //
    const productCreate=useSelector((state)=>state.productCreate)
    const {loading,error,success}=productCreate
useEffect(()=>{
  if(!userInfo){
    history.push("/login")
  }else if(userInfo.role==="user"){
    history.push("/")
  }else if(success){
setTimeout(() => {
  dispatch({type:PRODUCT_CREATE_RESET})
  history.push("/admin/productlist")
}, 2000)
  }

},[dispatch,history,success,userInfo]);
const submitHandler=(e)=>{
e.preventDefault()
dispatch(createProduct({name,countInStock,
  category,
  price,
  description,
  image,images,}))
}

const uploadFileHandler=async(e)=>{
  const file=e.target.files[0]
setImage(Object.assign(file,{
  preview:URL.createObjectURL(file)
  }))
}

const uploadFileHandler2=async(e)=>{
  const files=[...e.target.files] 

  setImages(files.map((file)=>Object.assign(file,{
      preview:URL.createObjectURL(file)
      })))
  }
    return (<StyledLogin variants={pageAnimation} initial="hidden" animate="show" exit="exit">
        <Meta title="Create product"/>
{loading&&<Loader/>}
{success&&<Message variant="success">Product created successfully</Message>}
{error&&<Message variant="danger">{error}</Message>}
         <Link to="/admin/productlist"> <button className="btn">Go back</button></Link>

         <div class="login">
        <form onSubmit={submitHandler} class="loginForm">
          <h3 class="text-center">Create Product</h3>
          <div class="form-group">
            <label for="name">Name</label>
            <input class="form-control"
             placeholder="Enter name"
            type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
          </div>
          <div class="form-group">
            <label for="category">Category</label>
            <input class="form-control"
             placeholder="Enter category"
            type="text" value={category} onChange={(e) => setCategory(e.target.value)} required/>
          </div>
          <div class="form-group">
            <label for="name">Product Details</label>
            <textarea  placeholder="Enter product details" rows="4" onChange={(e) => setDescription(e.target.value)}
            name="productDetails" form="usrform" value={description}></textarea>
          </div>
          <div class="form-group">
            <label for="price">Price</label>
            <input class="form-control"
             placeholder="Enter price"
            type="text" value={price} onChange={(e) => setPrice(e.target.value)} required/>
          </div>
          <div class="form-group">
            <label for="price">Count in stock</label>
            <input class="form-control"
            type="text" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} required/>
          </div>
          <div class="form-group">
            <label for="image">Image</label>
            <input class="form-control" className="fileInput"
            type="file" onChange={uploadFileHandler} />
            {image&&<span className="img"><img src={image.preview}></img>{image.name}
            </span>}
          </div>
          <div class="form-group">
            <label for="image">Images</label>
            <input class="form-control" className="fileInput"
            type="file" onChange={uploadFileHandler2} multiple/>
            {images&&images.map((file)=>(<span className="img"><img src={file.preview}/>{file.name}</span>))}
          </div>

          <div class="text">
       
            <button type="submit" disabled={
              name.length<1
            ||
            price.length<1
            ||
            category.length<1
            ||
            description.length<1
            ||
            countInStock.length<1
            ||
            Object.entries(image).length<1
            ||
          images.length<1
          }
         
            >Create</button>
          </div>
        </form>
      </div>
    
    </StyledLogin>
   
       );
}



 
const StyledLogin = styled(motion.div)`
min-height:81vh;
.btn {
    padding: 0.5rem 1rem;
    background-color: #1c2b2d;
    border: none;
    color: white;
    margin: 0.5rem;
    cursor: pointer;
    &:hover {
      background-color: #1c2324;
    }
    @media screen and (max-width: 900px) {
 display:none
    }
  }
.login {
  margin: auto;
  width: 25rem;
  margin-top:2rem;
  @media screen and (max-width: 900px) {
    margin-top:0rem;
 width:100%
    }
  .loginForm {
  background-color: #1f6f8b;
  padding: 20px 30px;
  border-radius: 10px;
  border: 2px solid grey;
  color: white;
  @media screen and (max-width: 900px) {
  border-radius:0px
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
      textarea{
        
      }
      .img{
          display:flex;
          align-items:center;
          font-size:0.85rem;
          img{
          width:4rem;
          margin:0.5rem 0rem;
          margin-right:0.4rem
      }
      }
    
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
}.fileInput{
  padding:0.2rem;
  background-color: white;
 color:black
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
export default AdminProductCreate;