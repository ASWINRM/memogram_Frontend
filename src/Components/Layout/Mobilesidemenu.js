import React, { useEffect, useState } from "react";
import { List, Icon, Dropdown, Container ,Menu} from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router";
import  LogoutUser  from '../../utils/logoutUser'

import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';

import axios from "axios";
function Mobilesidemenu({user,pc}) {
    // console.log(user);
    // console.log(pc)
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
       (async()=>{
         let res=await Axios.get(`https://memogramapp.herokuapp.com/api/notification/notificationlength`)

         if(res){
          setnotificationLength(parseInt(res.data))
          sessionStorage.setItem('NotificationLength',parseInt(res.data))
         }
       })();

       (async()=>{
         let msgres=await Axios.get(`https://memogramapp.herokuapp.com/api/chat/MessageNotification`)

         if(msgres){
        //    console.log(msgres.data.TotalLength)
           setmsgNotification(msgres.data.TotalLength)
           
           sessionStorage.setItem('MesgNotificationLength',parseInt(msgres.data.TotalLength))
         }
       })();
       
  // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // useEffect(()=>{
    //   console.log(notificationLength+" in side menu")
    // },[notificationLength])

    


    
    const Logout=(email)=>{
      console.log("logout");
            LogoutUser(email);
    }
    return (
        <>
         <Menu fluid borderless size='massive'>
             <Container text style={{position:"fixed",zIndex:"1"}} >
             <div
       
       style={{ display:'flex',flexDirection:'row',backgroundColor:'white',boxShadow:" 1px 5px #f2f4f2",borderBottomRightRadius:"1rem"  ,height:"20%",width:"97%"}}
       size="big"
       
       selection>   
           {
               pc==true? <List
               style={{ paddingTop: "1rem",marginLeft:"1rem" }}
               size="big"
               
               verticalAlign="middle"
               selection>           
           <Link to="/home" style={{ textDecoration: 'none' }} >
             <List.Item active={location.pathname==="/home"?true:false} style={location.pathname==="/home"?{"backgroundColor":"#EEEEEE" ,"borderRadius": "15px","paddingTop":"10px","paddingBottom":"10px"}: {"paddingTop":"10px","paddingBottom":"10px"}} >
               <Icon name="home" size="large" color={location.pathname!=="/home" ? "teal":"teal"} />
             </List.Item>
           </Link>
           <br />
   
           <Link to="/chats" style={{ textDecoration: 'none' }}>
             <List.Item active={isActive("/messages")} style={isActive("/messages")?{"backgroundColorr":"#EEEEEE" ,"borderRadius": "15px","paddingTop":"10px","paddingBottom":"10px"}: {"paddingTop":"10px","paddingBottom":"10px"}} >
             {
               (unreadMessage && msgNotification>0)?<Badge badgeContent={msgNotification} color="secondary"  overlap="circular" >
               <Icon
                 name={unreadMessage ? "mail" : "mail outline"}
                 size="large"
                 
                 color={
                   (isActive("/messages") && "teal") || (unreadMessage && "blue") || "blue"
                 }
               />
               </Badge>:<Icon
                 name={unreadMessage ? "mail" : "mail outline"}
                 size="large"
                 color={
                   (isActive("/messages") && "teal") || (unreadMessage && "blue") || "blue"
                 }
               />
             }
             
               
             </List.Item>
           </Link>
           <br />
   
           <Link to={`/${username}/notifications`} style={{ textDecoration: 'none' }}>
             <List.Item active={(window.location.pathname.split('/')[2] ==="notifications")} style={(window.location.pathname.split('/')[1] === username && window.location.pathname.split('/')[2] === "notifications")?{"backgroundColor":"#EEEEEE" ,"borderRadius": "15px","paddingTop":"10px","paddingBottom":"10px"}: {"paddingTop":"10px","paddingBottom":"10px"}} >
               
   
               {
                 (unreadNotification&&notificationLength>0)? <Badge badgeContent={notificationLength} color="secondary"  overlap="circular" >
                 <NotificationsIcon color="action" fontSize="large" color="primary" />
                  </Badge>: <NotificationsIcon color="action" fontSize="large" />
               }
               
             </List.Item>
           </Link>
           <br />
           <List.Item>
           <Dropdown item icon="bars" direction="left">
               <Dropdown.Menu>
                 <Link to={`/${username}`} style={{ textDecoration: 'none' }}>
                   <Dropdown.Item active={(window.location.pathname.split('/')[1] === username && window.location.pathname.split('/')[2] !== "notifications")} style={(window.location.pathname.split('/')[1] === username &&window.location.pathname.split('/')[2] !== "notifications")?{"backgroundColor":"#EEEEEE" ,"borderRadius": "15px","paddingTop":"10px","paddingBottom":"10px"}: {"paddingTop":"10px","paddingBottom":"10px"}} >
                     <Icon
                 name="user"
                 size="large"
                 color={(new URLSearchParams(location.search).get(username)  === username && "teal") || "grey"}
               />
                     Account
                   </Dropdown.Item>
                 </Link>
   
                 <Link to="/search">
                   <Dropdown.Item active={isActive("/search")}>
                     <Icon name="search" size="large" />
                     Search
                   </Dropdown.Item>
                 </Link>
   
                 <Dropdown.Item onClick={() => Logout(email)}>
                 <Icon name="log out" size="large" color="grey"/>
                   Logout
                 </Dropdown.Item>
               </Dropdown.Menu>
             </Dropdown>
          </List.Item>
           
   
          
         </List>:
    <>
     <Link to="/home" style={{ textDecoration: 'none' }} >
       <Menu.Item active={location.pathname==="/home"?true:false} style={location.pathname==="/home"?{"backgroundColor":"#EEEEEE" ,"borderRadius": "15px","paddingTop":"10px","paddingBottom":"10px"}: {"paddingTop":"10px","paddingBottom":"10px"}} >
         <Icon name="home" size="large" color={location.pathname!=="/home" ? "teal":"teal"} />
       </Menu.Item>
     </Link>
     <br />

     <Link to="/chats" style={{ textDecoration: 'none' }}>
       <Menu.Item active={isActive("/messages")} style={isActive("/messages")?{"backgroundColorr":"#EEEEEE" ,"borderRadius": "15px","paddingTop":"10px","paddingBottom":"10px"}: {"paddingTop":"10px","paddingBottom":"10px"}} >
       {
         (unreadMessage && msgNotification>0)?<Badge badgeContent={msgNotification} color="secondary"  overlap="circular" >
         <Icon
           name={unreadMessage ? "mail" : "mail outline"}
           size="large"
           color={
             (isActive("/messages") && "teal") || (unreadMessage && "blue") || "blue"
           }
         />
         </Badge>:<Icon
           name={unreadMessage ? "mail" : "mail outline"}
           size="large"
           color={
             (isActive("/messages") && "teal") || (unreadMessage && "blue") || "blue"
           }
         />
       }
       
         
       </Menu.Item>
     </Link>
     <br />

     <Link to={`/${username}/notifications`} style={{ textDecoration: 'none' }}>
       <Menu.Item active={(window.location.pathname.split('/')[2] ==="notifications")} style={(window.location.pathname.split('/')[1] === username && window.location.pathname.split('/')[2] === "notifications")?{"backgroundColor":"#EEEEEE" ,"borderRadius": "15px","paddingTop":"10px","paddingBottom":"10px"}: {"paddingTop":"10px","paddingBottom":"10px"}} >
         

         {
           (unreadNotification&&notificationLength>0)? <Badge badgeContent={notificationLength} color="secondary"  overlap="circular" >
           <NotificationsIcon color="action" fontSize="large" color="primary" />
            </Badge>: <NotificationsIcon color="action" fontSize="large" />
         }
         
       </Menu.Item>
     </Link>
     <br />
     <Menu.Item>
     <Dropdown item icon="bars" direction="left" style={{paddingBottom:"1rem"}}>
     
         <Dropdown.Menu>
           <Link to={`/${username}`} style={{ textDecoration: 'none' }}>
             <Dropdown.Item active={(window.location.pathname.split('/')[1] === username && window.location.pathname.split('/')[2] !== "notifications")} style={(window.location.pathname.split('/')[1] === username &&window.location.pathname.split('/')[2] !== "notifications")?{"backgroundColor":"#EEEEEE" ,"borderRadius": "15px","paddingTop":"10px","paddingBottom":"10px"}: {"paddingTop":"10px","paddingBottom":"10px"}} >
               <Icon
           name="user"
           size="large"
           color={(new URLSearchParams(location.search).get(username)  === username && "teal") || "grey"}
         />
               Account
             </Dropdown.Item>
           </Link>

           <Link to="/search">
             <Dropdown.Item active={isActive("/search")}>
               <Icon name="search" size="large" />
               Search
             </Dropdown.Item>
           </Link>

           <Dropdown.Item onClick={() => Logout(email)}>
           <Icon name="log out" size="large" color="grey"/>
             Logout
           </Dropdown.Item>
         </Dropdown.Menu>
       </Dropdown>
    </Menu.Item>
     

    </>
  
           }
          </div>
             </Container>
         </Menu>
       
      
    </>

    );
}

export default Mobilesidemenu;