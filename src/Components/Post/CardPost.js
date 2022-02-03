import React, { useEffect, useState } from "react";
import {
  Card,
  Icon,
  Image,
  Divider,
  Segment,
  Button,
  Popup,
  Header,
  Modal
} from "semantic-ui-react";
import PostComments from "./PostComments";
import CommentInputField from "./CommentInputField";
import calculateTime from "../../utils/calculateTime";
import { Link } from "react-router-dom";
import { deletePost, likePost } from "../../utils/postaction";
import LikedList from "./LikedList";
import ImageModal from "./ImageModal";
import NoImageModal from "./NoImageModal";

const CardPost=( {post,  setposts,posts, setShowToastr ,settingpost})=>{
  const user=JSON.parse(localStorage.getItem('user'));

  // console.log(posts)
  // console.log(post);
  // if(settingpost instanceof Function){
  //   // console.log("settingpost is a function in cardpost");
  //   // console.log(typeof(settingpost))
  //   // console.log(typeof(setShowToastr))
  // }else{
  //   console.log("In cardpost settingpost is "+settingpost);
  //   console.log(typeof(settingpost))
  //   console.log(typeof(setShowToastr))
  // }
  const [likes, setLikes] = useState(post.likes ? post.likes :[]);
  let isLiked =(likes && post.likes.length > 0) && likes.filter(like => like.user._id === user._id).length > 0;
 
  useEffect(()=>{
    console.log("isliked changing")
    // console.log(likes)
    if((likes) && likes.filter(like => like.user._id === user._id).length > 0){
      // console.log(likes)
      isLiked =true
      // console.log(isLiked)
    }else{
      // console.log(likes)
      isLiked =false
      // console.log(isLiked)
    }
  
  },[likes])
  // if(likes){
  //   // console.log(post.likes)
   
  //   // console.log( likes.filter(like => like.user._id === user._id).length > 0);
  //   // console.log(isLiked+" isLiked")
  // }else{
  //   isLiked=false;
  //   // console.log(isLiked+" isLiked")
  // }

  let [icon,seticon]=useState( isLiked?"heart":"heart outline" )

  
  

  const [comments, setComments] = useState(post.comments);

  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  
  // useEffect(()=>{
  // console.log(post);
  // console.log(user);
  // console.log(post.picurl);
  // },[])
  const settingcomments=(commentId)=>{
    if(commentId){
      console.log(commentId)
      console.log(comments)
      setComments((prev)=>prev.filter((comment)=>comment.id!==commentId))
      console.log(comments)
    }
  
  }
   

  const addingcomments=(addedcomments)=>{
    if(addedcomments){
      setComments((prev)=>[addedcomments,...prev])
      console.log(comments)
    }
  }
  const addPropsToModal = () => ({
    post,
    user,
    setLikes,
    likes,
    isLiked,
    comments,
    setComments,
    settingcomments
  });


 

  return (
    <>
      {showModal && (
        <Modal
          open={showModal}
          closeIcon
          closeOnDimmerClick
          onClose={() => setShowModal(false)}>
          <Modal.Content>
            {post.picurl ? (
              <ImageModal {...addPropsToModal()} />
            ) : (
              <NoImageModal {...addPropsToModal()} />
            )}
          </Modal.Content>
        </Modal>
      )}

      <Segment basic>
        <Card color="teal" fluid>
           {post.picUrl && (
            <Image
              src={post.picurl}
              style={{ cursor: "pointer" }}
              centered
              wrapped
              size='large'
              alt="PostImage"
              onClick={() => setShowModal(true)}
            />
          )} 

          <Card.Content>
            
           

              {(user.role === "root" || post && post.user.username=== user.username) && (
              <>
                <Popup
                  on="click"
                  position="top right"
                  trigger={
                    <Image
                    //icons8-waste-64
                       src={require('../../images/icons8-waste-64.png').default}
                      style={{ cursor: "pointer" }}
                      size="mini"
                      floated="right"
                    />
                  }>
                  <Header as="h4" content="Are you sure?" />
                  <p>This action is irreversible!</p>

                  <Button
                    color="red"
                    icon="trash"
                    content="Delete"
                    onClick={() => deletePost(post._id, setposts, setShowToastr,setError,posts,settingpost)}
                  />
                </Popup>
              </>
            )}  

             <Card.Header>
             {/* <Image src={require(`../../images/${post.user.profilepicurl}`).default} circular avatar inline />  */}
             <Image src={post.user.profilepicurl} circular avatar inline /> 
              <Link to={`/${post.user.name}`} >
                {post.user.name}
              </Link>
             
            </Card.Header>  

          
            <Card.Meta>{calculateTime(post.createdAt)}</Card.Meta>
            {post.location && <Card.Meta content={post.location} />}

            <Card.Description
              style={{
                fontSize: "17px",
                letterSpacing: "0.1px",
                wordSpacing: "0.35px"
              }}>
                 <Card.Description
              style={{
                fontSize: "17px",
                letterSpacing: "0.1px",
                wordSpacing: "0.35px"
              }}>
                
              {post.text}
            </Card.Description>
            <div style={{margin:"10px",marginLeft:"30%"}}>
           
                  <Image
                    src={post.picurl}
                  style={{ cursor: "pointer" }}
                  size='medium' 
                  centered
                  alt="PostImage"
                  onClick={() => setShowModal(true)}
                />
              
           
              
            </div>
               
            </Card.Description>
          </Card.Content>

          <Card.Content extra>
            <Icon
              name={icon}
              color="red"
              style={{ cursor: "pointer" }}
              onClick={async() =>{
                // console.log(isLiked)
                seticon(isLiked===true? "heart outline":"heart")
                // if(isLiked){
                 
                //   setLikes((prev)=>prev.filter(like=>like.user!==user.id));
                 
                // }else{
                //   console.log("setlike is false")
                
                //   setLikes((prev)=>[...prev,{user:user._id}])
                // }
                
               await likePost(post._id, user, setLikes, isLiked ? true : false,setError,isLiked);
               
                
              }
             
              }
              
            />

            <LikedList
              postId={post._id}
              trigger={
                 likes && likes.length > 0 && (
                  <span className="spanLikesList">
                    {`${likes.length} ${likes.length === 1 ? "like" : "likes"}`}
                  </span>
                )
              }
            />

            <Icon
              name="comment outline"
              style={{ marginLeft: "7px" }}
              color="blue"
            />

            {comments && comments.length > 0 &&
              comments.map(
                (comment, i) =>
                  i < 3 && (
                    <PostComments
                      key={comment._id}
                      comment={comment}
                      postId={post._id}
                      user={user}
                      setComments={setComments}
                      settingcomments={settingcomments}
                    />
                  )
              )}

            {comments &&comments.length > 3 && (
              <Button
                content="View More"
                color="teal"
                basic
                circular
                onClick={() => setShowModal(true)}
              />
            )}

            <Divider hidden />

            <CommentInputField
              user={user}
              postId={post._id}
              setComments={setComments}
             addingcomments={addingcomments}

            />
          </Card.Content>
        </Card>
      </Segment>
      <Divider hidden />
    </>
  );
}

export default CardPost;
