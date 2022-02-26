import React from "react";
import { Feed, Divider } from "semantic-ui-react";
import calculateTime from "../../utils/calculateTime";
import { Segment,Button,Icon } from 'semantic-ui-react'
import { Link } from "react-router-dom";
function MessageNotification({ notification,setmsgnotification}) {
    console.log(notification)
  return (

      <Segment raised>

      <Feed>
       
    <Feed.Event>

      <Feed.Label>
        <img  src={notification.user.profilepicurl} style={{width:"2em", height:"3em"}} />
      </Feed.Label>
      <Feed.Content>
      <>
              <Feed.User >
                <Link to={`/${notification.user.name}`}>{notification.user.name}</Link>
              </Feed.User>{" "}
              sent <a >{notification.messgae}</a>
              <Feed.Date>{calculateTime(notification.date)}</Feed.Date>
            </>
      </Feed.Content>
           <Button circular icon='close' color='red' onClick={()=>setmsgnotification(null)} />
         
      
    </Feed.Event>
  </Feed>
  </Segment>
       
       
      
      
 
  );
}

export default MessageNotification;
