import React from 'react';
import  { useState ,useEffect} from "react";
import { List, Image, Search,Divider } from "semantic-ui-react";
import axios from "axios";
import { useHistory } from "react-router";
import {  Icon } from 'semantic-ui-react'
function ChatListSearch({search}) {
    const [text, settext] = useState("");
    const [loading, setloading] = useState(false);
    const [results, setresults] = useState([]);
    const [inputval, setinputval] = useState("");
    const localuser=JSON.parse(localStorage.getItem('user'))
   
   var value="";

  //  useEffect(()=>{
  //    console.log(results);
  //  },[results]);

   useEffect(()=>{
     if(text===""){
     
        setresults([]);
      
     }
     
   },[text])
   
    const handlechange=async (e)=>{
      
         value=e.target.value;
        // console.log(value);
       setinputval(e.target.value)
      try{
          settext(value);
         setloading(true);
         
         if(value.length===0){
           settext(value);
           setresults([]);
          }
          if(value.length>0){
            const token=JSON.parse(localStorage.getItem('token'));
            // console.log(token);
           const res=await axios.get(`https://memogramapp.herokuapp.com/api/search/${value}`,{
               headers:{
                   Authorization:token
               }
           })
           if(res){
            // console.log(res.data);
            if(Array.isArray(res.data)){
            //  console.log("results");
             
             setresults(res.data.filter((result)=>result._id!==localuser._id))
              
            }
         
           }
           
          }
         
          
    
         
         setloading(false);
      }catch(e){
        // console.log(e);
        setloading(false);
      }
    
      }


    useEffect(() => {
        if(text.length===0 && loading){
          setloading(false);
        }
        
    }, [text,loading])

    return(
      <div>
<div>

    <input
     placeholder="ChatSearch"
     onChange={handlechange}
     style={{borderRadius:"20px",height:"1.7rem",marginRight:"1px",border:"2px solid black"}}
     value={inputval}
   />
   <Icon name='search'></Icon>
   <List  className="searches" >
     {
       results.length>0 && results.map((result)=>{
             
        return (
          
<List.Item key={result._id} onClick={()=>{setinputval("") 
    search(result)
    setresults("")
    }} >
<Image src={result.profilepicurl} alt="ProfilePic" avatar />
   <List.Content header={result.name} as="a" />
 
<Divider/>
</List.Item>
        )

            }
   )

     }
   </List>
  
   </div>
      </div>
      
      
    )
}

export default ChatListSearch;