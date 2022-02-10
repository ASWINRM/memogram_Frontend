import React, {  useState } from "react";
import { Comment, Icon } from "semantic-ui-react";
import calculateTime from "../../utils/calculateTime";
import { deleteComment } from "../../utils/postaction";


const PostComments=({ comment, user, setComments, postId,settingcomments,socket })=>{
  // console.log(comment);
  let [disabled, setDisabled] = useState(false);
  let [name, setname] = useState(comment.user.name);
  let [profilepicurl, setprofilepicurl] = useState(comment.user.profilepicurl);
  
  let [commentremove,setcommentremove]=useState(false);
  let ownuser=JSON.parse(localStorage.getItem('user'))
  
  // console.log(ownuser._id);
  // console.log(comment)
  // console.log(comment.user._id)

  return (
    <>
    {
      !commentremove &&<Comment.Group>
      <Comment>
        {
          profilepicurl!==" " ?  <Comment.Avatar src={profilepicurl} />:ownuser._id===comment.user._id?<Comment.Avatar src={user.profilepicurl} />:<Comment.Avatar src={ownuser.profilepicurl} />
        }
       
        <Comment.Content>
          {
            name!==" " && <Comment.Author as="a" href={`/${name}`}>
            {name}
          </Comment.Author>
          }
          
          <Comment.Metadata>{calculateTime(comment.date)}</Comment.Metadata>

          <Comment.Text>{comment.text}</Comment.Text>

          <Comment.Actions>
            <Comment.Action>
              {(user.role === "root" || name === user.username || ownuser._id===comment.user._id) && (
                <Icon
                  disabled={disabled}
                  color="red"
                  name="trash"
                  onClick={async () => {
                    settingcomments(comment.id);
                    socket.current.emit('deletecomment',{userId:ownuser._id,commentId:comment._id,postId:postId})
                    socket.current.on("commentdeleted",()=>{
                      console.log("comment deleted")
                    })
                  }}
                />
              )}
            </Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    </Comment.Group>
    }
    
    </>
      
  );
}

export default PostComments;
