import React, { useEffect, useState } from "react";
import { Feed, Segment, Divider, Container,Dimmer,Loader } from "semantic-ui-react";
import axios from "axios";
import { NoNotifications } from "../Components/Layout/NoData";
import LikeNotification from "../Components/Notifications/LikeNotification";
import CommentNotification from "../Components/Notifications/CommentNotification";
import FollowerNotification from "../Components/Notifications/FollowerNotification";
import Navbar from '../Components/Layout/Navbar'
import { parseInt } from "lodash";
function Notifications() {
  const [userfollowstats,setuserfollowstats]=useState();
  const [notifications,setnotifications]=useState(null);
  const [pageloading,setpageloading]=useState(false)
  let notificationLength=parseInt(sessionStorage.getItem('NotificationLength'))
  // console.log(notificationLength+"  in notification js")
  const Axios=axios.create({
                
    headers: {  "Content-Type": "application/json",Authorization:  JSON.parse(localStorage.getItem('token')) }
  });
  useEffect(() => {

    
    (async function() {

        try {
            
            await Promise.all([getuserfollowstatstics,  usernotifications(),notificationRead(),makeNotificationsRead()]);
           
        } catch (e) {
            console.error(e);
        }
    })();

    let olduser=JSON.parse(localStorage.getItem('user'));
    olduser['unreadNotification']=false;
    localStorage.setItem('user',JSON.stringify(olduser))
    localStorage.setItem('NotificationLength',0)

  }, []);

  useEffect(()=>{
    //  console.log(notifications)
     if(notifications){
         localStorage.setItem('notificationLength',notifications.length );
     }
  },[notifications])


  const getuserfollowstatstics=async ()=>{
   
    try{
        setpageloading(true)
        const followingstats=await Axios.get(`https://memogramapp.herokuapp.com/api/followtask/followings`);

        const followerstats=await Axios.get(`https://memogramapp.herokuapp.com/api/followtask/followers`);

        if(followingstats && followerstats){
            
            setuserfollowstats({following:followingstats.data,followers:followerstats.data})
            setpageloading(false)
        }
    }catch(e){
        setpageloading(false)
        // console.log(e)
    }
    
}

const makeNotificationsRead=async ()=>{
    try{

        const res=await Axios.post(`https://memogramapp.herokuapp.com/api/notification/makeNotificationsRead`,{notificationLength:notificationLength})

    }catch(e){
        // console.log(e)
    }
}



const notificationRead = async () => {
    try {
        setpageloading(true)
      await Axios.post(
        `https://memogramapp.herokuapp.com/api/notification/SetNotificationsRead`);
        setpageloading(false)
    } catch (error) {
      console.log(error);
      setpageloading(false)
    }
  };


  const usernotifications=async ()=>{
    try {
        setpageloading(true)
        let res=await Axios.get(`https://memogramapp.herokuapp.com/api/notification/getuserNotifications`);

        if(res){
            setnotifications(res.data)
            setpageloading(false)
        }
      } catch (error) {
        setpageloading(false)
        console.log(error);
      }
}
  return (
    <>
    
      <Container style={{ marginTop: "1.5rem" }}>
      {pageloading ?<Dimmer active inverted>
                        <Loader size='massive'>Loading</Loader>
                        </Dimmer>:
                       
         (notifications &&notifications.length > 0 )? (

            <>
           
          <Segment color="teal" raised>
            <div
              style={{
                maxHeight: "40rem",
                overflow: "auto",
                height: "40rem",
                position: "relative",
                width: "100%"
              }}
            >
              <Feed size="small">
                {notifications.map(notification => (
                  <>
                    {notification.type === "Newlike" && notification.post !== null && (
                      <LikeNotification
                        key={notification._id}
                        notification={notification}
                      />
                    )}

                    {notification.type === "NewComment" && notification.post !== null && (
                      <CommentNotification
                        key={notification._id}
                        notification={notification}
                      />
                    )}

                    {notification.type === "NewFollower" && (
                      <FollowerNotification
                        key={notification._id}
                        notification={notification}
                        userfollowstats={userfollowstats}
                        setuserfollowstat={setuserfollowstats}
                      />
                    )}
                  </>
                ))}
              </Feed>
            </div>
          </Segment>
          </>
        ) : (
          <NoNotifications />
        )}
        <Divider hidden />
    
      </Container>
    </>
  );
}



export default Notifications;
