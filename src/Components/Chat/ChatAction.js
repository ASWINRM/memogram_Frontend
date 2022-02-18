import React from 'react';

import axios from 'axios';

function ChatAction(history) {

    const Axios = axios.create({
                   
        headers: {   "Content-Type": "application/json",Authorization: JSON.parse(localStorage.getItem('token'))}
      });
      
    let controller=new AbortController();
    let signal=controller.signal
    console.log("machi")
    try{
        (async()=>{
            let res=await Axios.get(`https://memogramapp.herokuapp.com/api/chat`,{signal:signal});
    
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
      

  
   
}

export default ChatAction;