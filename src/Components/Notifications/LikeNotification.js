import React from "react";
import { Feed, Divider } from "semantic-ui-react";
import calculateTime from "../..//utils/calculateTime";


function LikeNotification({ notification }) {
    // console.log(notification)
 
  
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
              liked your <a href={`/post/${notification.post._id}`}>post.</a>
              <Feed.Date>{calculateTime(notification.date)}</Feed.Date>
            </>
          </Feed.Summary>

          {notification.post.picUrl && (
            <Feed.Extra images>
              <a href={`/post/${notification.post._id}`}>
                <img src={notification.post.profilepicurl} alt="postpic"/>
              </a>
            </Feed.Extra>
          )}
        </Feed.Content>
      </Feed.Event>
      <Divider />
    </>
  );
}

export default LikeNotification;

