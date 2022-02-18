import React ,{memo}from "react";

import calculateTime from "../../utils/calculateTime";
import './Message.css'



function Message({ message, user, bannerProfilePic, divRef }) {
 

  const ifYouSender = message.sender === user._id;
 

  return (
    <div className="bubbleWrapper" ref={divRef}>
      <div
        className={ifYouSender ? "inlineContainer own" : "inlineContainer"}
        // onClick={() => ifYouSender && showDeleteIcon(!deleteIcon)}
      >
        <img
          className="inlineIcon"
          src={ifYouSender ? user.profilepicurl : bannerProfilePic}
          alt="bannerpic"
        />

        <div className={ifYouSender ? "ownBubble own" : "otherBubble other"}>
          {message.msg}
        </div>

       
      </div>

      <span className={ifYouSender ? "own" : "other"}>{calculateTime(message.date)}</span>
    </div>
  );
}

export default memo(Message);
