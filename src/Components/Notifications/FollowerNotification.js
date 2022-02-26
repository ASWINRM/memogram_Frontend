import React, { useCallback, useState ,useEffect} from "react";
import { Feed, Button, Divider } from "semantic-ui-react";
import calculateTime from "../../utils/calculateTime";
import {userfollow,userunfollow} from '../../utils/followaction'
import newMsgSound from "../Chat/newsound";
function FollowerNotification({ notification, userfollowstats, setuserfollowstats }) {

  const [disabled, setDisabled] = useState(false);
   const [loading,setloading]=useState(false);
   console.log(userfollowstats)
  const [isFollowing,setisFollowing] =useState( userfollowstats.following.length > 0 &&
    userfollowstats.following.filter(
        following => following.user === notification.user._id
      ).length > 0);

    let followuser=useCallback((id)=>{
        // console.log('followuser')
       setuserfollowstats(prev=>({
           ...prev,
           following:[...prev.following,{user:id}]
       }))

     
    },[userfollowstats])
    
   let unfollowuser=useCallback((id)=>{
      //  console.log("unfollow user")
       setuserfollowstats(prev=>({
           ...prev,
           following:prev.following.filter((f)=>f.user!==id)
       }))
       
    
   },[userfollowstats])

  return (
    <>
      <Feed.Event>
        <Feed.Label image={notification.user.profilepicurl} />
        <Feed.Content>
          <Feed.Summary>
            <>
              <Feed.User as="a" href={`/${notification.user.username}`}>
                {notification.user.name}
              </Feed.User>{" "}
              started following you.
              <Feed.Date>{calculateTime(notification.date)}</Feed.Date>
            </>
          </Feed.Summary>

          <div style={{ position: "absolute", right: "5px" }}>
            <Button
              size="small"
              compact
              icon={isFollowing ? "check circle" : "add user"}
              color={isFollowing ? "instagram" : "twitter"}
              disabled={disabled}
              loading={loading}
              onClick={async () => {
                setDisabled(true);
               
                    setloading(true)
                    isFollowing?await userunfollow(notification.user._id,unfollowuser):await userfollow(notification.user._id,followuser)
                    setloading(false);
                     setisFollowing(!isFollowing)
                  
               

                setDisabled(false);
              }}

            />
          </div>
        </Feed.Content>
      </Feed.Event>
      <Divider />
    </>
  );
}

export default FollowerNotification;
