import React from 'react';

//Redux

//Styling and Animationimport styled from "styled-components";
import styled from "styled-components";
import { motion} from "framer-motion";
import { pageAnimation } from "../animations";
import Meta from '../components/Meta';

const About = () => {

    
    return (  <StyledAbout variants={pageAnimation} initial="hidden" animate="show" exit="exit">
          <Meta title="About"/>
<div className="about">
    <div className="section">
        
<h2>About us</h2>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi volutpat condimentum efficitur. Sed tempor lacinia neque et vestibulum. Nam a semper leo, quis lacinia libero. Nulla facilisi. Etiam blandit porttitor luctus. Nam eget sapien condimentum, tincidunt sem in, dictum diam. In libero mauris, fringilla nec libero nec, lobortis tincidunt lectus. Sed convallis quam ultrices dictum pellentesque. Fusce sit amet tincidunt sapien.

Nullam venenatis leo mi, id vehicula purus finibus non. Maecenas pretium vulputate vehicula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer mattis vestibulum massa, nec rutrum ligula lobortis a. Proin quis ornare lectus. Cras magna nisi, commodo suscipit velit at, dapibus tristique odio. Aliquam sollicitudin purus a pellentesque congue.

Nunc vulputate dolor purus. Nullam risus purus, cursus eget suscipit quis, ultrices in enim. Morbi fermentum aliquet odio sit amet semper. Aenean nec quam nunc. Suspendisse ut lorem feugiat justo rhoncus dignissim eu eget ipsum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam id est finibus, consequat neque id, bibendum dolor. Praesent diam eros, mollis quis euismod sed, porta eu dolor. Sed sagittis neque nec sagittis aliquet. Aliquam ac nisi dapibus, congue ligula vel, pretium magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse luctus tincidunt augue, ac suscipit lectus accumsan eget. Quisque ligula risus, finibus ut imperdiet et, efficitur in purus.

Quisque auctor arcu quam, id congue odio placerat ac. Vestibulum ut sapien vel sem dictum faucibus. Pellentesque sagittis mauris ac dignissim vehicula. Donec ac euismod tortor. Sed ut tincidunt libero. Mauris in orci sit amet justo luctus placerat sit amet ut urna. Vestibulum vitae viverra tellus. Nullam justo tellus, sodales quis interdum eu, vulputate sed erat. Vestibulum velit urna, bibendum a vehicula vel, pretium condimentum enim. Donec sem urna, hendrerit et sodales sed, blandit vel turpis. Suspendisse vitae neque ex. Nunc cursus odio mauris, nec sodales arcu convallis eget. Donec nunc neque, viverra ullamcorper libero ut, malesuada bibendum sem.

Nulla id mollis tellus. Vivamus quis ante lorem. Aenean in neque metus. Vivamus eleifend eu ligula eu finibus. Sed dapibus, libero gravida posuere pellentesque, libero nunc semper turpis, quis pretium elit augue non turpis. Pellentesque et mollis mi, vitae consequat odio. Cras turpis orci, auctor eu tellus sed, bibendum varius justo. Quisque tincidunt velit at tincidunt tempus. Nam molestie tempus mi vel imperdiet.
    </div>

        
</div>


   </StyledAbout>)
}
 
const StyledAbout = styled(motion.div)`
min-height:81vh;
.about{
    margin:1rem 2rem;
    background-color:white;
    color:black;
    padding:1rem 2rem;
border-radius:5px;
min-height:80vh;
@media screen and (max-width: 900px) {
    margin:0;
    padding:0.7rem;
    min-height:81vh;
    border-radius:0px;
}
h2{
    text-align:center;
    padding:1rem;
    @media screen and (max-width: 900px) {
        padding:0.5rem;
        font-size:1.4rem
    }
}
}


`
export default About;