import React ,{useEffect}from 'react';
import {useHistory} from 'react-router-dom'
import axios from 'axios';
function ChatAction(props) {
    const history=useHistory();
    const Axios = axios.create({
                   
        headers: {   "Content-Type": "application/json",Authorization: JSON.parse(localStorage.getItem('token'))}
      });
      useEffect(()=>{
    
        (async()=>{
            let res=await Axios.get(`https://memogramapp.herokuapp.com/api/chat`);
    
            if(res!=="no chats"){
                // console.log(res.data)
             
                localStorage.setItem('chats',JSON.stringify(res.data))
                history.push(`/messages/${res.data[0].messagesWith}`)
            }else{
                localStorage.setItem('chats',JSON.stringify(res.data))
                history.push(`/messages/${res.data[0].messagesWith}`)
            }
        })();
        
     // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

      return (
          <></>
      )
   
}

export default ChatAction;