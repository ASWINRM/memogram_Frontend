import React,{useState,useEffect,useRef} from 'react';
import { Comment, Grid ,Segment} from "semantic-ui-react";
import axios from 'axios';
import {useHistory} from 'react-router-dom'
import Chatlist from './Chatlist';
import {NoMessages} from '../Layout/NoData'
import ChatListSearch from './ChatListSearch';
import ChatWindow from './ChatWindow';
import io from 'socket.io-client'
import newMsgSound from './newsound'

const scrollDivToBottom = divRef =>
divRef.current !== null && divRef.current.scrollIntoView({ behaviour: "smooth" });

function Chat() {

  const [chats,setchats]=useState();
  const [connectedusers,setconnectedusers]=useState();
  const [messages,setmessages]=useState();
  const [bannerdata,setbannerdata]=useState({name:"",profilepicurl:""})
  const history=useHistory();
  const divRef=useRef();
  // console.log(window.location.pathname.split('/')[1]==='chats')
  const querymsgwith=window.location.pathname.split("/")[2]
  const user=JSON.parse(localStorage.getItem('user'))
  const OpenId=useRef();
  const Axios = axios.create({
                   
    headers: {   "Content-Type": "application/json",Authorization:  JSON.parse(localStorage.getItem('token'))}
  });

  useEffect(()=>{

  let allchats=JSON.parse(localStorage.getItem('chats'));
  setchats(allchats)
    
 
  },[])

  const unreading=async()=>{
    let res=await Axios.post(`https://memogramapp.herokuapp.com/api/chat/setNotificationRead`)
    
    if(res){
      let olduser=JSON.parse(localStorage.getItem('user'));
      olduser['unreadMessage']=false;
      localStorage.setItem('user',JSON.stringify(olduser))
      // console.log(res)
    }
  }
  
  const lengthToZer0=async()=>{
    let res=await Axios.post(`https://memogramapp.herokuapp.com/api/chat/NotifyLengthZero`)
     
    if(res){
      sessionStorage.setItem('MesgNotificationLength',0)
      // console.log(res)
    }
  }

  useEffect(()=>{
    (async()=>{
      try {
            
        await Promise.all([unreading(),lengthToZer0()]);
       
    } catch (e) {
        console.error(e);
    }
    })();
   // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  


  useEffect(()=>{
    // console.log(messages)
    if(messages && messages.length>4){
      divRef.current && scrollDivToBottom (divRef)
    }
  },[messages])

  // useEffect(()=>{
  //   console.log(chats)
  // },[chats])

  let socket=useRef()

    useEffect(()=>{
        if(!socket.current){
          socket.current=io.connect('https://memogramapp.herokuapp.com');
        }

        if(socket.current){
            socket.current.emit('join',{userId:user._id})

            socket.current.on("connectedusers",({users})=>{
              if(users.length>0){
                  // console.log(users)
                setconnectedusers(users)
              }
            })

          
           
            
        }

        return () => {
            if (socket.current) {
              socket.current.disconnect();
              socket.current.off();
            }
          };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // async function finduser(){
     
    //   if(querymsgwith){
    //     console.log("dei mame")
    //     let res=await axios.get(`http://localhost:5000/api/chat/finduser`,{userid:querymsgwith})
    //     if(res){
    //       console.log("findusers")
    //       console.log(res)
    //       setbannerdata({name:res.data.name,profilepicurl:res.data.profilepicurl})
    //       setmessages([]);
    //     }
    //   }
    // }

    useEffect(()=>{

      (async()=>{
        if(querymsgwith){
          // console.log("dei load message")
          socket.current.emit('loadmessage',{userId:user._id,messagesWith:querymsgwith})

        
      }
      })();
       
         
        socket.current.on('messageloaded',(chat)=>{
          divRef.current && scrollDivToBottom (divRef)
            // console.log(chat)
            setmessages(chat.messages)
            OpenId.current=chat.messagesWith._id;
            setbannerdata({name:chat.messagesWith.name,profilepicurl:chat.messagesWith.profilepicurl})
        })
    },[querymsgwith])


    useEffect(()=>{
      if(socket.current){
        socket.current.on("newmsgreceived",(newchat)=>{

         
   // console.log(newchat)
   setmessages((prev)=>[...prev,newchat])
   newMsgSound(bannerdata.name);
    let newchats=JSON.parse(localStorage.getItem('chats'))
   // console.log(newchats);
 
   if(newchats &&newchats.filter((ms)=>ms.messagesWith===newchat.sender).length>0 ){
     newchats.find((ms)=>ms.messagesWith===newchat.sender)['lastMessage']=newchat.msg;
     newchats.find((ms)=>ms.messagesWith===newchat.sender)['date']=Date.now();
     // console.log(newchats)
    
      setchats(prev=> [newchats.find((ms)=>ms.messagesWith===newchat.sender),...prev.filter((chat)=>chat.messagesWith!==newchat.sender)])
   }else{
     let newch={
       date:newchat.date,
       lastMessage:newchat.msg,
       messagesWith:newchat.receiver,
       name:bannerdata.name,
       profilepicurl:bannerdata.profilepicurl
     }

   
     setchats((prev)=>[newch,...prev])
   }
          
       
         
          // localStorage.setItem('chats',JSON.stringify(chats))
        })
       
        
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    })

    useEffect(()=>{
      (async()=>{
        socket.current.on('nomsgfound',async()=>{
          // console.log("dei no msg found")
          // console.log(querymsgwith)
          if(querymsgwith){
            let res=await axios.get(`https://memogramapp.herokuapp.com/api/chat/finduser/${querymsgwith}`)
             
            if(res){
              if(res!=="nochats"){
                OpenId.current=res.data._id
                setbannerdata({name:res.data.name,profilepicurl:res.data.profilepicurl})
                setmessages([]);
              }
              // console.log("findusers")
              // console.log(res)
             
            }
          }
         
        })

      })();
    },[querymsgwith])

  const search=(result)=>{
   
    let alreadyinChat=chats.length>0 && chats.filter((chat)=>result.messagesWith===result._id).length>0;

    if(alreadyinChat){
        history.push(`/messages/${result.messagesWith}`)
    }else{
        let newchat={
            messagesWith: result._id,
            name: result.name,
            profilepicurl: result.profilepicurl,
            lastMessage: "",
            date: Date.now()
        }

        setchats(prev=>[newchat,...prev])
        localStorage.setItem('chats',JSON.stringify(chats))
        history.push(`/messages/${result._id}`)
    }
   

  }


  const sendmsg=(text)=>{
    if(socket.current){
      let newch={
        date:Date.now(),
        lastMessage:text,
        messagesWith:OpenId.current,
        name:bannerdata.name,
        profilepicurl:bannerdata.profilepicurl
      }
    
      let newmsg={
        msg:text,
        sender:user._id,
        receiver:OpenId.current,
        date:Date.now()
      }
      setmessages((prev)=>[...prev,newmsg])
      setchats((prev)=>[newch,...prev.filter((chat)=>chat.messagesWith!==newch.messagesWith)])
      // console.log(user._id);
      // console.log(OpenId.current)
      socket.current.emit("sendmessage",{
        userId:user._id,
        msgToId:OpenId.current,
        msg:text
      })
    }
  }


  const deletechat=async(messageId)=>{
    
      setchats((prev)=>[...prev.filter((p)=>p.messagesWith!==messageId)])
    await Axios.post('https://memogramapp.herokuapp.com/api/chat/deleteChat',{messagesWith:messageId})

    
  }
    return (
        <Segment raised style={{marginTop:"20px",width:"97%"}}>
            <div style={{marginTop:"20px"}}>
               <ChatListSearch  search={search}></ChatListSearch> 
            </div>

            {

              querymsgwith==='nochats'?<NoMessages></NoMessages>:
                (chats&&chats.length>0) ? (
                    <div style={{marginTop:"20px",width:"100%"}}>
                    <Grid stackable>
                        <Grid.Column width={4}>
                            <Comment.Group size='big'>
                                <Segment raised style={{pverfolw:"auto",maxHeight:"26rem"}}>
                                  {chats.map((chat,i)=>(
                                      <Chatlist
                                        key={i}
                                        chat={chat}
                                        connectedusers={connectedusers}
                                        deletechat={deletechat}
                                      ></Chatlist>
                                  ))}
                                </Segment>
                            </Comment.Group>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={6} computer={10}>
                            <ChatWindow
                            messages={messages}
                            bannerdata={bannerdata} 
                            user={user}
                            divRef={divRef}
                            sendmsg={sendmsg}
                            >
                            </ChatWindow>
                        </Grid.Column>
                    </Grid>
                    </div>
                ):<NoMessages></NoMessages>
            }
        </Segment>
    );
}

export default Chat;