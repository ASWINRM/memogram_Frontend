import React,{useState,useEffect,useRef, useCallback} from 'react';
import { Comment, Grid ,Segment} from "semantic-ui-react";
import axios from 'axios';
import {useHistory} from 'react-router-dom'
import Chatlist from './Chatlist';
import {NoMessages} from '../Layout/NoData'
import ChatListSearch from './ChatListSearch';
import ChatWindow from './ChatWindow';

import newMsgSound from './newsound'
import MessageNotification from '../Notifications/MessageNotification'
const scrollDivToBottom = divRef =>
divRef.current !== null && divRef.current.scrollIntoView({ behaviour: "smooth" });

function Chat({settingstate,messagesWith,socket}) {

  const [chats,setchats]=useState();
  const [connectedusers,setconnectedusers]=useState();
  const [messages,setmessages]=useState();
  const [bannerdata,setbannerdata]=useState({name:"",profilepicurl:""})
  const history=useHistory();
  const divRef=useRef();

  let [aboutchat,setaboutchat]=useState();
  let [notification,setnotification]=useState(null);
  // console.log(window.location.pathname.split('/')[1]==='chats')
  const querymsgwith=messagesWith
  
  const [user,setuser]=useState(JSON.parse(localStorage.getItem('user')));
  const OpenId=useRef();

  const Axios = axios.create({
                   
    headers: {   "Content-Type": "application/json",Authorization:  JSON.parse(localStorage.getItem('token'))}
  });

  useEffect(()=>{
     socket.current.emit('connectedusers',{userId:user._id})
  },[])

  useEffect(()=>{

  let allchats=JSON.parse(localStorage.getItem('chats'));
  console.log(allchats.about)
  console.log(allchats)
  setchats(allchats.ChatsToBeSent)
    setaboutchat(allchats.about)
 
  },[])

  const unreading=useCallback(async()=>{
    let res=await Axios.post(`https://memogramapp.herokuapp.com/api/chat/setNotificationRead`)
    
    if(res){
      let olduser=JSON.parse(localStorage.getItem('user'));
      olduser['unreadMessage']=false;
      localStorage.setItem('user',JSON.stringify(olduser))
      // console.log(res)
    }
  },[])
  
  const lengthToZer0=useCallback(async()=>{
    let res=await Axios.post(`https://memogramapp.herokuapp.com/api/chat/NotifyLengthZero`)
     
    if(res){
      sessionStorage.setItem('MesgNotificationLength',0)
      // console.log(res)
    }
  },[])
 
  let config=useCallback( async()=>{
    try {
          
      await Promise.all([unreading(),lengthToZer0()]);
     
  } catch (e) {
      console.error(e);
  }
  },[])
  useEffect(()=>{
   config()
   // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  useEffect(()=>{
    console.log("bannerdata"+bannerdata)
  },[bannerdata])


  useEffect(()=>{
    // console.log(messages)
    if(messages && messages.length>4){
      divRef.current && scrollDivToBottom (divRef)
    }
  },[messages])

  // useEffect(()=>{
  //   console.log(chats)
  // },[chats])

  


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
              console.log(querymsgwith);
      (async()=>{
        if(querymsgwith){
          console.log("dei load message")
          socket.current.emit('loadmessage',{userId:user._id,messagesWith:querymsgwith})

        
      }
      })();
       
         
        socket.current.on('messageloaded',(chat)=>{
          divRef.current && scrollDivToBottom (divRef)
            console.log(chat)
            setmessages(chat.messages)
            OpenId.current=chat.messagesWith._id;
            setbannerdata({name:chat.messagesWith.name,profilepicurl:chat.messagesWith.profilepicurl})
        })
    },[querymsgwith,user._id])


    useEffect(()=>{
      if(socket.current){
        socket.current.on("newmsgreceived",(newchat)=>{

      
         
   // console.log(newchat)
   setmessages((prev)=>[...prev,newchat])

    let newchats=JSON.parse(localStorage.getItem('chats'))
   // console.log(newchats);
 
   if(newchats &&newchats.filter((ms)=>ms.messagesWith===newchat.sender).length>0 ){
     newchats.find((ms)=>ms.messagesWith===newchat.sender)['lastMessage']=newchat.msg;
     newchats.find((ms)=>ms.messagesWith===newchat.sender)['date']=Date.now();
     // console.log(newchats)
     newMsgSound(bannerdata.name);
       setnotification({
         user:{
           profilepicurl:newchats.find((ms)=>ms.messagesWith===newchat.sender).profilepicurl,
           name:newchats.find((ms)=>ms.messagesWith===newchat.sender).name,
           messagesWith:newchats.find((ms)=>ms.messagesWith===newchat.sender).messagesWith
         },
         messgae:newchat.msg,
         date:newchat.date
       })
      setchats(prev=> [newchats.find((ms)=>ms.messagesWith===newchat.sender),...prev.filter((chat)=>chat.messagesWith!==newchat.sender)])
   }else{
     let newch={
       date:newchat.date,
       lastMessage:newchat.msg,
       messagesWith:newchat.receiver,
       name:bannerdata.name,
       profilepicurl:bannerdata.profilepicurl
     }
     newMsgSound(bannerdata.name);
     setnotification({
      user:{
        profilepicurl:newch.profilepicurl,
        name:newch.name,
        messagesWith:newch.messagesWith
      },
      messgae:newchat.msg,
      date:newchat.date
    })
     if(!aboutchat){
      setaboutchat("chats found")
    }
     setchats((prev)=>[newch,...prev])
   }
          
       
         
          // localStorage.setItem('chats',JSON.stringify(chats))
        })
       
        
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(()=>{
      (async()=>{
        socket.current.on('nomsgfound',async()=>{
          // console.log("dei no msg found")
          console.log(querymsgwith)
          if(querymsgwith){
            let res=await axios.get(`https://memogramapp.herokuapp.com/api/chat/finduser/${querymsgwith}`)
             
            if(res){
              if(res!=="nochats"){
                OpenId.current=res.data._id
                console.log(res.data)
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

  const search=useCallback((result)=>{
   console.log(chats);
    let alreadyinChat= (chats && chats.length>0) && chats.filter((chat)=>result.messagesWith===result._id).length>0;

    if(alreadyinChat){
        settingstate(`messages/${result.messagesWith}`)
    }else{
        let newchat={
            messagesWith: result._id,
            name: result.name,
            profilepicurl: result.profilepicurl,
            lastMessage: "",
            date: Date.now()
        }

        setchats(prev=>[newchat,...prev])
        setaboutchat("chats found")
        localStorage.setItem('chats',JSON.stringify(chats))
        settingstate(`messages/${result._id}`)
    }
   

  },[chats])


  const sendmsg=useCallback((text)=>{
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
      if(!aboutchat){
        setaboutchat("chats found")
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
  },[messages,bannerdata]);


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
              notification && <MessageNotification notification={notification} ></MessageNotification>
            }

            { 
                 <>{
                  aboutchat==='chats not found'&&<NoMessages></NoMessages>
                 }
                 {

                
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
                                        settingstate={settingstate}
                                        querymsgwith={messagesWith}
                                      ></Chatlist>
                                  ))}
                                </Segment>
                            </Comment.Group>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={6} computer={10}>
                          {
                            bannerdata &&<ChatWindow
                            messages={messages}
                            bannerdata={bannerdata} 
                            user={user}
                            divRef={divRef}
                            sendmsg={sendmsg}
                            querymsgwith={querymsgwith}
                            >
                            </ChatWindow>
                          }
                            
                        </Grid.Column>
                    </Grid>
                    </div>
                ):<NoMessages></NoMessages>
              }
                </>

            }
        </Segment>
    );
}

export default Chat;