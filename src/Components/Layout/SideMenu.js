import React, { useEffect, useState } from "react";
import { List, Icon } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router";
import  LogoutUser  from '../../utils/logoutUser'
import { useHistory } from "react-router";
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import axios from "axios";

const SideMenu=({user,pc,settingstate,activeState,ChatAction})=>{
//   console.log(pc)
// console.log(user)

  let history=useHistory();
    const location=useLocation();
    const  { unreadNotification, email, unreadMessage, username }=user
    const [notificationLength,setnotificationLength]=useState()
    const [msgNotification,setmsgNotification]=useState()
    // console.log(username);
    // console.log(window.location.pathname.split('/')[1])
    // console.log(window.location.pathname.split('/')[2])
    // console.log(window.location.pathname.split('/')[2]==='notifications'+"page")

 
    let notifyLength =async(signal)=>{
      let res=await Axios.get(`https://memogramapp.herokuapp.com/api/notification/notificationlength`,{signal:signal})

      if(res){
       setnotificationLength(parseInt(res.data))
       sessionStorage.setItem('NotificationLength',parseInt(res.data))
      }
      
    }

    let chatnotification=async(signal)=>{ 
      let msgres=await Axios.get(`https://memogramapp.herokuapp.com/api/chat/MessageNotification`,{signal:signal})

      if(msgres){
       //  console.log(msgres.data.TotalLength)
        setmsgNotification(msgres.data.TotalLength)
        
        sessionStorage.setItem('MesgNotificationLength',parseInt(msgres.data.TotalLength))
      }
    }
   
    
    const Axios=axios.create({
                
      headers: {  "Content-Type": "application/json",Authorization:  JSON.parse(localStorage.getItem('token')) }
    });

    useEffect(()=>{
      
      let controller=new AbortController();
      let signal = controller.signal;

      try{
        Promise.all([chatnotification(signal),notifyLength(signal)]);

      }catch(e){
        console.log(e)
      }

      return () => controller.abort();
       
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])



    // const isActive = route => {

    //   if(window.location.pathname.split('/')[1]===route){
    //     return true;
    //   }else{
    //     // console.log("location return"+ location.pathname.toString().trim() === route.toString().trim())
    //     // console.log(location.pathname.toString().trim());
    //     // console.log(route);
    
    //     return location.pathname.toString() === route.toString();
    //   }
     

    // }



    useEffect(()=>{
      if(activeState==='messages'){
        setmsgNotification(0)
      }

  },[msgNotification])


  useEffect(()=>{
    if(activeState==='notifications'){
      setnotificationLength(0)
    }
},[notificationLength])

    
    // useEffect(()=>{
    //   console.log(notificationLength+" in side menu")
    // },[notificationLength])

    


    
    const Logout=(email)=>{
      // console.log("logout");
            LogoutUser(email);
    }
   
    return (
        <>
        
      <List
        style={{ paddingTop: "1rem",marginLeft:"1rem" }}
        size="big"
        verticalAlign="middle"
        selection>

          <List.Item active={activeState==="home"?true:false} style={activeState==="home"?{"backgroundColor":"#EEEEEE" ,"borderRadius": "15px","paddingTop":"10px","paddingBottom":"10px"}: {"paddingTop":"10px","paddingBottom":"10px"}}
          onClick={()=>settingstate('home')}
          >
            <Icon name="home" size="large" color={activeState!=="home" ? "teal":"teal"} />
            {
              (pc===true) && <List.Content>
              <List.Header content="Home" />
            </List.Content>
          
            }
           </List.Item>
      
        <br />

        
          <List.Item onClick={()=>ChatAction()} active={activeState==="messages"} style={activeState==="messages"?{"backgroundColorr":"#EEEEEE" ,"borderRadius": "15px","paddingTop":"10px","paddingBottom":"10px"}: {"paddingTop":"10px","paddingBottom":"10px"}} >
          {
            (unreadMessage && msgNotification>0)?<Badge badgeContent={msgNotification} color="secondary"  overlap="circular" >
            <Icon
              name={unreadMessage ? "mail" : "mail outline"}
              size="large"
              color={
                (activeState==="messages" && "teal") || (unreadMessage && "blue") || "blue"
              }
              onClick={()=>ChatAction()}
            />
            </Badge>:<Icon
              name={unreadMessage ? "mail" : "mail outline"}
              size="large"
              color={
                (activeState==="messages" && "teal") || (unreadMessage && "blue") || "blue"
              }
             
            />
          }
          {(pc===true) &&<List.Content>
              <List.Header content="Messages" />
            </List.Content> }
            
          </List.Item >
        
        <br />

        
          <List.Item active={activeState ==="notification"} style={(activeState ==="notification" )?{"backgroundColor":"#EEEEEE" ,"borderRadius": "15px","paddingTop":"10px","paddingBottom":"10px"}: {"paddingTop":"10px","paddingBottom":"10px"}}
          onClick={()=>settingstate('notification')} >
            {/* <Icon
              name={unreadNotification ? "hand point right" : "bell outline"}
              size="large"
              color={
                (isActive(`/${username}/notifications`) && "teal") ||
                (unreadNotification && "orange")
              }
            /> */}

            {
              (unreadNotification&&notificationLength>0)? <Badge badgeContent={notificationLength} color="secondary"  overlap="circular" >
              <NotificationsIcon color="action" fontSize="large" color="primary" />
               </Badge>: <NotificationsIcon color="action" fontSize="large" />
            }
            {
              (pc===true)&& <List.Content>
              <List.Header content="Notifications" />
            </List.Content>
            }
            
          </List.Item>
        
        <br />

        
          <List.Item active={(activeState===username && activeState!== "notifications")} style={(activeState === username &&activeState !== "notifications")?{"backgroundColor":"#EEEEEE" ,"borderRadius": "15px","paddingTop":"10px","paddingBottom":"10px"}: {"paddingTop":"10px","paddingBottom":"10px"}}
          onClick={()=>settingstate(username)}
          >
            <Icon
              name="user"
              size="large"
              color={(activeState=== username && "teal") || "grey"}
            />
            {
              (pc===true) && <List.Content>
              <List.Header content="Account" />
            </List.Content>
            }
            
          </List.Item>
        
        <br />

        <List.Item onClick={() => Logout(email)}>
          <Icon name="log out" size="large" color="grey"/>
          {
            (pc===true) &&<List.Content>
            <List.Header content="Logout" />
          </List.Content>
          }
          
        </List.Item>
      </List>
      
    </>

    )
}

export default SideMenu
