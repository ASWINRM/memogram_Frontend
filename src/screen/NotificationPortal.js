import React from 'react';
import { Segment, TransitionablePortal, Icon, Feed } from "semantic-ui-react";
import calculateTime from '../utils/calculateTime';
import { useHistory } from 'react-router'
import newNotificationSound from './newNotificationSound'

function NotificationPortal({
    newNotification,
    notificationPopup,
    showNotificationPopup
  }) {
    const history=useHistory()
    console.log(newNotification);
    const {type}=newNotification;
    const {profilepicurl,name}=type==="comment"? newNotification.comment.user:type==="like"?newNotification.notification.notifyuser:newNotification.sender;
    const  post=type==="comment"?newNotification.notification.newnotification.post:type==="like"?newNotification.notification.newNotification.post:"";
    const username= type==="comment"?newNotification.notification.notifyuser.username:type==="like"?newNotification.notification.notifyuser.username:newNotification.sender.username;
    const {text}=type==="comment"?newNotification.comment:"";

    
    return (
        <TransitionablePortal
          transition={{ animation: "fade left", duration: "500" }}
          onClose={() => notificationPopup && showNotificationPopup(false)}
          onOpen={newNotificationSound}
          open={notificationPopup}
        >
          <Segment style={{ right: "5%", position: "fixed", top: "10%", zIndex: 1000 }}>
            <Icon
              name="close"
              size="large"
              style={{ float: "right", cursor: "pointer" }}
              onClick={() => showNotificationPopup(false)}
            />
    
            <Feed>
              <Feed.Event>
                <Feed.Label>
                  <img src={profilepicurl} alt="profilepicurl" />
                </Feed.Label>
                <Feed.Content>
                  {
                    type==="comment"&& (
                      <Feed.Summary>
                      <Feed.User onClick={() => history.push(`/${username}`)}>{name} </Feed.User>{" "}
                      commented {text} on your <a href={`/post/${post}`}> post</a>
                      <Feed.Date>{calculateTime(Date.now())}</Feed.Date>
              
                        </Feed.Summary>
                    )
                  } 
                    {
                    type==="like" && (
                      <Feed.Summary>
                      <Feed.User onClick={() => history.push(`/${username}`)}>{name} </Feed.User>{" "}
                     liked on your <a href ={`/post/${post}`} > post</a>
                      <Feed.Date>{calculateTime(Date.now())}</Feed.Date>
              
                        </Feed.Summary>
                    )
                  }

                  {
                    type==="Follower" &&(
                      <Feed.Summary>
                      <Feed.User onClick={() => history.push(`/${username}`)}>{name} </Feed.User>{" "}
                       has started to follow you
                      <Feed.Date>{calculateTime(Date.now())}</Feed.Date>
              
                        </Feed.Summary>
                    )
                  }
                  
                </Feed.Content>
              </Feed.Event>
            </Feed>
          </Segment>
        </TransitionablePortal>
      );
    
}

export default NotificationPortal;