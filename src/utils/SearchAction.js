import React from 'react';
import  { useState ,useEffect} from "react";
import { List, Image, Search } from "semantic-ui-react";
import axios from "axios";
import { useHistory } from "react-router";
import { Button, Icon } from 'semantic-ui-react'
import {followuser,followings} from './followaction'
import TextField from '@mui/material/TextField';
import { margin } from '@mui/system';

async function SearchAction(results,result){
   
  
    // console.log(results.length);
    // console.log( result.name);
    var follows=false;
   
   const logintoken=JSON.parse(localStorage.getItem('token'));
   const Axios = axios.create({
     
   headers: {   "Content-Type": "application/json",Authorization: logintoken}
   });
   const res=await Axios.get("https://memogramapp.herokuapp.com/api/followtask/followings")
   
   if(res){
    // console.log(res.data);
     res.data.forEach((item,index)=>{
          if(item.user===result._id.toString()){
              console.log("match")
           follows=true;
           }
          
         })
        //  console.log(result._id,result.profilepicurl,result.name);
   }
 
   return(
     
     
           // <List.Item key={result._id}>
 
           //     <Image src={require(`../../images/${result.profilepicurl}`).default} alt="ProfilePic" avatar />
           //        <List.Content header={result.name} as="a" />
           //           {follows==true? <Button size='mini' color='blue' floated='right' onClick={()=>followuser(result._id)}>following
           //              <Icon loading name='check circle' corner/></Button>:
           //              <Button size='mini' color='blue' floated='right' onClick={()=>followuser(result._id)}>follow</Button> }
 
           //              </List.Item>
           <p>jjh</p>        
   )             
       
 }

 export default SearchAction;