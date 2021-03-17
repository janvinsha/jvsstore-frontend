import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`

*{
    margin:0;
    padding:0;
    box-sizing:border-box
}
html{
    &::-webkit-scrollbar{
        width:0.5rem;
    }&::-webkit-scrollbar-thumb{
        background-color:darkgrey
    }
    @media(max-width:1700){
        font-size:70%
    }
}
body{

    font-family:"Roboto",sans-serif;
    width:100%;
    overflow-x:hidden;
    background-color:#e6d5b8;
    @media (max-width: 900px) {
    font-size:1rem
}
}

button{

        border: 0px;
        background-color: #99a8b2;
        outline: none;
        border-radius: 5px;
        color: white;
        cursor: pointer;
        font-size:1rem;
        &:hover {
          color: whitesmoke;
          background-color: #9eb0bd;
        }
        &:disabled {
          background-color: #c8cfd4;
          color:white;
          cursor:default
        }
   
}h1{
    font-family: "Montserrat", sans-serif;
}
h2{
        font-weight:lighter;
        font-size:2rem;
        font-family: "Montserrat", sans-serif;

    }
    h3{

        color:white;
        font-family: "Montserrat", sans-serif;
    }
    h4{

        font-weight:bold;
      font-size:2rem;
      font-family: "Montserrat", sans-serif;
    }
    span{

    }
    a{
      
        text-decoration:none;
        color:white;
    }
    p{

    }
`;
export default GlobalStyle;
