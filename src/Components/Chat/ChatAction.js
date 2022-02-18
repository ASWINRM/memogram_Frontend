import React ,{useEffect}from 'react';
import {useHistory} from 'react-router-dom'
import axios from 'axios';

function ChatAction() {
    const history=useHistory();
    const Axios = axios.create({
                   
        headers: {   "Content-Type": "application/json",Authorization: JSON.parse(localStorage.getItem('token'))}
      });
      useEffect(()=>{
    let controller=new AbortController();
    let signal=controller.signal
    try{
        (async()=>{
            let res=await Axios.get(`https://memogramapp.herokuapp.com/api/chat`,{signal,signal});
    
            if(res){
                // console.log(res.data)
                console.log(res);
                localStorage.setItem('chats',JSON.stringify(res.data))
                history.push(`/messages/${res.data[0].messagesWith}`)
            }
        })();
    }catch(e){
       console.log(e);
    }
        return () => {
        // cancel the request before component unmounts
        controller.abort();
    };
        
     // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

     
   
}

export default ChatAction;