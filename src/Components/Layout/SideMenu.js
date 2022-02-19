import React, { useEffect, useState } from "react";
import { List, Icon } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router";
import  LogoutUser  from '../../utils/logoutUser'
import { useHistory } from "react-router";
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import axios from "axios";
import ChatAction from "../Chat/ChatAction";
const SideMenu=({user,pc})=>{
//   console.log(pc)
// console.log(user)
  let history=useHistory();
    const location=useLocation();
    const  { unreadNotification, email, unreadMessage, username }=user
    // console.log(username);
    // console.log(window.location.pathname.split('/')[1])
    // console.log(window.location.pathname.split('/')[2])
    // console.log(window.location.pathname.split('/')[2]==='notifications'+"page")

 
   

    const isActive = route => {

      if(window.location.pathname.split('/')[1]===route){
        return true;
      }else{
        // console.log("location return"+ location.pathname.toString().trim() === route.toString().trim())
        // console.log(location.pathname.toString().trim());
        // console.log(route);
    
        return location.pathname.toString() === route.toString();
      }
     

    }
    const [notificationLength,setnotificationLength]=useState()
    const [msgNotification,setmsgNotification]=useState()
    useEffect(()=>{
      if(window.location.pathname.split('/')[1]==='messages'){
        setmsgNotification(0)
      }

  },[msgNotification])

  useEffect(()=>{
    if(window.location.pathname.split('/')[2]==='notifications'){
      setnotificationLength(0)
    }
},[notificationLength])
    const Axios=axios.create({
                
      headers: {  "Content-Type": "application/json",Authorization:  JSON.parse(localStorage.getItem('token')) }
    });

    useEffect(()=>{
      let controller=new AbortController();
     let signal = controller.signal;
   
    
         let res=await Axios.get(`https://memogramapp.herokuapp.com/api/notification/notificationlength`,{signal:signal})

         if(res){
          setnotificationLength(parseInt(res.data))
          sessionStorage.setItem('NotificationLength',parseInt(res.data))
         }
         
     

  
        
         let msgres=await Axios.get(`https://memogramapp.herokuapp.com/api/chat/MessageNotification`,{signal:signal})

         if(msgres){
          //  console.log(msgres.data.TotalLength)
           setmsgNotification(msgres.data.TotalLength)
           
           sessionStorage.setItem('MesgNotificationLength',parseInt(msgres.data.TotalLength))
         }
   

      return () => controller.abort();
       
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

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
        <Link to="/home" style={{ textDecoration: 'none' }} >
          <List.Item active={location.pathname==="/home"?true:false} style={location.pathname==="/home"?{"backgroundColor":"#EEEEEE" ,"borderRadius": "15px","paddingTop":"10px","paddingBottom":"10px"}: {"paddingTop":"10px","paddingBottom":"10px"}} >
            <Icon name="home" size="large" color={location.pathname!=="/home" ? "teal":"teal"} />
            {
              (pc===true) && <List.Content>
              <List.Header content="Home" />
            </List.Content>
          
            }
           </List.Item>
        </Link>
        <br />

        
          <List.Item onClick={()=>ChatAction(history)} active={isActive("/messages")} style={isActive("/messages")?{"backgroundColorr":"#EEEEEE" ,"borderRadius": "15px","paddingTop":"10px","paddingBottom":"10px"}: {"paddingTop":"10px","paddingBottom":"10px"}} >
          {
            (unreadMessage && msgNotification>0)?<Badge badgeContent={msgNotification} color="secondary"  overlap="circular" >
            <Icon
              name={unreadMessage ? "mail" : "mail outline"}
              size="large"
              color={
                (isActive("/messages") && "teal") || (unreadMessage && "blue") || "blue"
              }
              onClick={()=>ChatAction(history)}
            />
            </Badge>:<Icon
              name={unreadMessage ? "mail" : "mail outline"}
              size="large"
              color={
                (isActive("/messages") && "teal") || (unreadMessage && "blue") || "blue"
              }
             
            />
          }
          {(pc===true) &&<List.Content>
              <List.Header content="Messages" />
            </List.Content> }
            
          </List.Item   >
        
        <br />

        <Link to={`/${username}/notifications`} style={{ textDecoration: 'none' }}>
          <List.Item active={(window.location.pathname.split('/')[2] ==="notifications")} style={(window.location.pathname.split('/')[1] === username && window.location.pathname.split('/')[2] === "notifications")?{"backgroundColor":"#EEEEEE" ,"borderRadius": "15px","paddingTop":"10px","paddingBottom":"10px"}: {"paddingTop":"10px","paddingBottom":"10px"}} >
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
        </Link>
        <br />

        <Link to={`/${username}`} style={{ textDecoration: 'none' }}>
          <List.Item active={(window.location.pathname.split('/')[1] === username && window.location.pathname.split('/')[2] !== "notifications")} style={(window.location.pathname.split('/')[1] === username &&window.location.pathname.split('/')[2] !== "notifications")?{"backgroundColor":"#EEEEEE" ,"borderRadius": "15px","paddingTop":"10px","paddingBottom":"10px"}: {"paddingTop":"10px","paddingBottom":"10px"}} >
            <Icon
              name="user"
              size="large"
              color={(new URLSearchParams(useLocation().search).get(username)  === username && "teal") || "grey"}
            />
            {
              (pc===true) && <List.Content>
              <List.Header content="Account" />
            </List.Content>
            }
            
          </List.Item>
        </Link>
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
