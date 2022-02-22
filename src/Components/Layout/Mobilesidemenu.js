import React, { useEffect, useState } from "react";
import { List, Icon, Dropdown, Container ,Menu, DropdownMenu} from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router";
import  LogoutUser  from '../../utils/logoutUser'
import ChatAction from "../Chat/ChatAction";
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useHistory } from "react-router";
import axios from "axios";
function Mobilesidemenu({user,pc,activeState,settingstate}) {
    // console.log(user);
    // console.log(pc)
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
      if(activeState==='messages'){
        setmsgNotification(0)
      }
  },[msgNotification])

  useEffect(()=>{
    if(activeState==='notifications'){
      setnotificationLength(0)
    }
},[notificationLength])
    const Axios=axios.create({
                
      headers: {  "Content-Type": "application/json",Authorization:  JSON.parse(localStorage.getItem('token')) }
    });

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
               pc===true? 
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
               </List>:
    <>
     <Menu.Item active={activeState==="home"?true:false} style={activeState==="home"?{"backgroundColor":"#EEEEEE" ,"borderRadius": "15px","paddingTop":"10px","paddingBottom":"10px"}: {"paddingTop":"10px","paddingBottom":"10px"}}
          onClick={()=>settingstate('home')}
          >
            <Icon name="home" size="large" color={activeState!=="home" ? "teal":"teal"} />
            {
              (pc===true) && <List.Content>
              <List.Header content="Home" />
            </List.Content>
          
            }
           </Menu.Item>

           <Menu.Item onClick={()=>ChatAction()} active={activeState==="messages"} style={activeState==="messages"?{"backgroundColorr":"#EEEEEE" ,"borderRadius": "15px","paddingTop":"10px","paddingBottom":"10px"}: {"paddingTop":"10px","paddingBottom":"10px"}} >
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
            
          </Menu.Item >
          <br />
          <Menu.Item active={activeState ==="notification"} style={(activeState ==="notification" )?{"backgroundColor":"#EEEEEE" ,"borderRadius": "15px","paddingTop":"10px","paddingBottom":"10px"}: {"paddingTop":"10px","paddingBottom":"10px"}}
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
            
          </Menu.Item>
           <br />
           <Menu.Item>
     <Dropdown item icon="bars" direction="left" style={{paddingBottom:"1rem"}}>
     
         <Dropdown.Menu>
         <DropdownMenu.Item active={(activeState===username && activeState!== "notifications")} style={(activeState === username &&activeState !== "notifications")?{"backgroundColor":"#EEEEEE" ,"borderRadius": "15px","paddingTop":"10px","paddingBottom":"10px"}: {"paddingTop":"10px","paddingBottom":"10px"}}
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
            
          </DropdownMenu.Item>
          
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