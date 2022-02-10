import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import {postComment } from "../../utils/postaction";

const CommentInputField=({ postId, user, setComments,addingcomments,socket })=>{
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

 
  return (
    <Form
      reply
      onSubmit={async e => {
        e.preventDefault();
        setLoading(true);
        socket.current.emit('commentpost',{
          postId:postId, user:user, text:text
        })

        socket.current.on('commented',({data})=>{
          console.log("commented")
          addingcomments(data)
          
        setLoading(false);
           setText("");
         })

      }}>
      <Form.Input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add Comment"
        action={{
          color: "blue",
          icon: "edit",
          loading: loading,
          disabled: text === "" || loading
        }}
      />
    </Form>
  );
}

export default CommentInputField;