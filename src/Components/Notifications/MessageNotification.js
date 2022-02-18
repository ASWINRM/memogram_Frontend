import React from "react";
import { Feed, Divider } from "semantic-ui-react";
import calculateTime from "../../utils/calculateTime";

function MessageNotification({ notification}) {
    // console.log(notification)
  return (
    <>
      <Feed.Event>
        <Feed.Label image={notification.user.profilepicurl} />
        <Feed.Content>
          <Feed.Summary>
            <>
              <Feed.User as="a" href={`/messages/${notification.user.messageswith}`}>
                {notification.user.name}
              </Feed.User>{" "}
              sent <a href={`/messages/${notification.messageswith}`}>{notification.message}</a>
              <Feed.Date>{calculateTime(notification.date)}</Feed.Date>
            </>
          </Feed.Summary>

          
        </Feed.Content>
      </Feed.Event>
      <Divider />
    </>
  );
}

export default MessageNotification;
