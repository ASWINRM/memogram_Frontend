import React, { useState,useEffect, useCallback } from "react";
import axios from "axios";
import { Card, Icon, Image, Divider, Segment, Container,Dimmer,Loader } from "semantic-ui-react";

import PostComments from "./PostComments";
import CommentInputField from "./CommentInputField";
import calculateTime from "../../utils/calculateTime";
import { likePost } from "../../utils/postaction";
import LikedList from "./LikedList";
import { Link } from "react-router-dom";
import Navbar from "../Layout/Navbar";


function PostPage() {
    const Axios=axios.create({
                
        headers: {  "Content-Type": "application/json",Authorization:  JSON.parse(localStorage.getItem('token')) }
      });

      const [post,setpost]=useState(null);
      let user=JSON.parse(localStorage.getItem('user'));
      const postId=window.location.pathname.split('/')[2];
      const [likes,setlikes]=useState(null);
      const [comments,setcomments]=useState(null)
      // console.log(postId);
      
      const isLiked = (likes&& likes.length > 0) && likes.filter(like => like.user === user._id).length > 0;
  
    useEffect(()=>{
     
      (async(req,res)=>{
          
          let resp=await Axios.get(`https://memogramapp.herokuapp.com/api/post/postById/${postId}`)

          if(resp){
              // console.log(resp.data)
              setpost(resp.data)
              setlikes(resp.data.likes)
              setcomments(resp.data.comments)
          }
      })();

    },[])

    const settingcomments=useCallback((commentId)=>{
        if(commentId){
          setcomments((prev)=>prev.filter((comment)=>comment._id!==commentId))
        }
      
      },[comments])

    return (
        <>
           <Navbar></Navbar>
        <Container text>
            {
                post ? (
           <>
        
          <Segment basic>

            <Card color="teal" fluid>
              {(post && post.picurl) && (
                <Image
                  src={post.picurl}
                  style={{ cursor: "pointer" }}
                  centered
                  size='medium'
                  
                  alt="PostImage"
                 
                />
              )}
    
              <Card.Content>
                <Image floated="left" src={post.user.profilepicurl} avatar circular />
                <Card.Header>
                  <Link href={`/${post.user.username}`}>
                    <a>{post.user.name}</a>
                  </Link>
                </Card.Header>
    
                <Card.Meta>{calculateTime(post.createdAt)}</Card.Meta>
    
                {post.location && <Card.Meta content={post.location} />}
    
                <Card.Description
                  style={{
                    fontSize: "17px",
                    letterSpacing: "0.1px",
                    wordSpacing: "0.35px"
                  }}
                >
                  {post.text}
                </Card.Description>
              </Card.Content>
    
              <Card.Content extra>
                <Icon
                  name={isLiked ? "heart" : "heart outline"}
                  color="red"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    likePost(post._id, user._id, setlikes, true,isLiked,)
                  }
                />
    
                <LikedList
                  postId={post._id}
                  trigger={
                    (likes &&likes.length) > 0 && (
                      <span className="spanLikesList">
                        {`${likes.length} ${likes.length === 1 ? "like" : "likes"}`}
                      </span>
                    )
                  }
                />
    
                <Icon name="comment outline" style={{ marginLeft: "7px" }} color="blue" />
    
                {(comments&&comments.length > 0) &&
                   comments.map(comment => (
                    <PostComments
                      key={comment._id}
                      comment={comment}
                      user={user}
                      setcomments={setcomments}
                      postId={post._id}
                     settingcomments={settingcomments}
                    />
                  ))}
    
                <Divider hidden />
    
                <CommentInputField user={user} postId={post._id} setComments={setcomments} />
              </Card.Content>
            </Card>
          </Segment>
          <Divider hidden />
          </>):<Dimmer active inverted>
       
      
       <Loader size='massive'>Loading</Loader>
      
        </Dimmer>
        }
        </Container>
        </>
      );
    
}

export default PostPage;
