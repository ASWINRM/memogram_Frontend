import React from "react";
import { Modal, Grid, Image, Card, Icon, Divider } from "semantic-ui-react";
import PostComments from "./PostComments";
import CommentInputField from "./CommentInputField";
import calculateTime from "../../utils/calculateTime";
import { Link } from "react-router-dom";
import { likePost } from "../../utils/postaction";
import LikedList from "./LikedList";

const ImageModal=({
  post,
  user,
  setLikes,
  likes,
  isLiked,
  comments,
  setComments
}) =>{
  return (
    <>
      <Grid columns={2} stackable relaxed>
        <Grid.Column>
          <Modal.Content image>
            {/* <Image wrapped size="large" src={require(`../../images/${post.post.picurl}`).default} /> */}
            <Image wrapped size="large" src={post.picurl} />
          </Modal.Content>
        </Grid.Column>
     
        <Grid.Column>
          <Card fluid>
            <Card.Content>
              {/* <Image floated="left" avatar src={   require(`../../images/${post.post.user.profilepicurl}`).default} /> */}
              <Image floated="left" avatar src={post.user.profilepicurl} />
              <Card.Header>
                <Link to={`/${post.user.name}`} style={{ textDecoration: 'none' }}>
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
                {post.text}
              </Card.Description>
            </Card.Content>

            <Card.Content extra>
              <Icon
                name={isLiked ? "heart" : "heart outline"}
                color="red"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  likePost(post._id, user._id, setLikes, isLiked ? false : true)
                }
              />

              <LikedList
                postId={post._id}
                trigger={
                  likes.length > 0 && (
                    <span className="spanLikesList">
                      {`${likes.length} ${likes.length === 1 ? "like" : "likes"}`}
                    </span>
                  )
                }
              />

              <Divider hidden />

              <div
                style={{
                  overflow: "auto",
                  height: comments.length > 2 ? "200px" : "60px",
                  marginBottom: "8px"
                }}>
                {comments.length > 0 &&
                  comments.map(comment => (
                    <PostComments
                      key={comment._id}
                      comment={comment}
                      postId={post._id}
                      user={user}
                      setComments={setComments}
                    />
                  ))}
              </div>

              <CommentInputField
                postId={post._id}
                user={user}
                setComments={setComments}
              />
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    </>
  );
}

export default ImageModal;
