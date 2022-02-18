import React, { useState, useRef ,useCallback} from "react";
import { Form, Button, Image, Divider, Message, Icon } from "semantic-ui-react";

import { submitNewPost } from "../../utils/postaction";
import axios from 'axios';

const CreatePost=({ user, setPosts,logintoken,setloading })=>{
  let [newPost, setNewPost] = useState({ text: "", location: "" ,picurl:""});
 
  let inputRef = useRef();
  let [picUrl, setpicUrl] = useState();
  let [error, setError] = useState(null);
  let [highlighted, setHighlighted] = useState(false);

  let [media, setmedia] = useState(null);
  let [mediaPreview, setMediaPreview] = useState(null);



  const handleChange =useCallback(async (e)  => {
    const { name, value } = e.target;
   
    if (name === "media") {
      
      setmedia(e.target.files[0]);
      setMediaPreview(URL.createObjectURL(e.target.files[0]));
      if (e.target.files[0] !== null) {
        // console.log(media);
        const formdata = new FormData()
        formdata.append('file',e.target.files[0] )
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: localStorage.getItem('token')
          }
        }
        let picurl = await axios.post('https://memogramapp.herokuapp.com/api/post/upload',formdata,config);
        if(picurl!==null){
          localStorage.setItem('postingpic',JSON.stringify(picurl.data));
          // console.log(picurl.data);
        
          setpicUrl(picurl.data)
          setNewPost(prev => ({ ...prev, picurl: picurl }))
          // console.log(newPost);
          
          // if(picUrl){
          //   console.log(picUrl);
          // }else{
          //   console.log("picurl undefined");
          //   console.log(JSON.parse(localStorage.getItem('postingpic')))
          // }
        
        }
        // if (!picUrl) {
        //   setloading(false);
        //   return setError("Error Uploading Image");
        // }

       
      }else{
        // console.log(e.target.files[0])
        // console.log("media is null")
      }
      
    }else{
      // console.log("others")
      setNewPost(prev => ({ ...prev, [name]: value }));
    }

    
  },[newPost,picUrl,media,mediaPreview]);


 
  const addStyles = () => ({
    textAlign: "center",
    height: "150px",
    width: "150px",
    border: "dotted",
    paddingTop: media === null && "60px",
    cursor: "pointer",
    borderColor: highlighted ? "green" : "black"
  });

  const handleSubmit = async e => {
    try{
      

     
  
      await submitNewPost(
        newPost.text,
        newPost.location,
        newPost.picurl,
        setPosts,
        setNewPost,
        setError,
        logintoken,
        picUrl
      );
      // console.log("handelsubmit");

      // setmedia(null);
      // setMediaPreview(null);
      setloading(true)
      newPost.text="";
      newPost.location="";
      setmedia(null);
      setMediaPreview("");
      mediaPreview="";
    }catch(e){
      // console.log(e)
    }
    e.preventDefault();
    setloading(true);
  };

  return (
    <>
      <Form error={error !== null} onSubmit={handleSubmit}>
        {
          error && <Message
          error
          onDismiss={() => setError(null)}
          content={error}
          header="Oops!"
        />
        }
        

        <Form.Group>
        <Image src={user.profilepicurl} circular avatar inline />
           {/* <Image src={require(`../../images/${user.profilepicurl}`).default} circular avatar inline />  */}
           {/* <Image src={require(`../../images/icons8-waste-64.png`).default} circular avatar inline />  */}
          {/* <Image src={process.env.PUBLIC_URL+`/images/${user.profilepicurl}`} circular avatar inline /> */}
          <Form.TextArea
            placeholder="Whats Happening"
            name="text"
            value={newPost.text}
            onChange={handleChange}
            rows={4}
            width={14}
          />
        </Form.Group>

        <Form.Group>
          <Form.Input
            value={newPost.location}
            name="location"
            onChange={handleChange}
            label="Add Location"
            icon="map marker alternate"
            placeholder="Want to add Location?"
          />  
           <input
            ref={inputRef}
            onChange={handleChange}
            name="media"
            style={{ display: "none" }}
            type="file"
            accept="image/*"
          />
          </Form.Group>

          {/* <input
            ref={inputRef}
            onChange={handleChange}
            name="media"
            style={{ display: "none" }}
            type="file"
            accept="image/*"
          />
        </Form.Group>

         <div
          onClick={() => inputRef.current.click()}
          style={addStyles()}
          onDrag={e => {
            e.preventDefault();
            setHighlighted(true);
          }}
          onDragLeave={e => {
            e.preventDefault();
            setHighlighted(false);
          }}
          onDrop={e => {
            e.preventDefault();
            setHighlighted(true);

            const droppedFile = e.dataTransfer.files;

            setmedia(droppedFile[0]);
            setMediaPreview(URL.createObjectURL(droppedFile[0]));
          }}>
          {media === null ? (
            <Icon name="plus" size="big" />
          ) : (
            <>
              <Image
                style={{ height: "150px", width: "150px" }}
                src={mediaPreview}
                alt="PostImage"
                centered
                size="medium"
                
              />
            </>
          )}
        </div>  */}
         <div
          onClick={() => inputRef.current.click()}
          style={addStyles()}
          onDrag={e => {
            e.preventDefault();
            setHighlighted(true);
          }}
          onDragLeave={e => {
            e.preventDefault();
            setHighlighted(false);
          }}
          onDrop={e => {
            e.preventDefault();
            setHighlighted(true);

            const droppedFile = e.dataTransfer.files;

            setmedia(droppedFile[0]);
            setMediaPreview(URL.createObjectURL(droppedFile[0]));
          }}>
          {media === null ? (
            <Icon name="plus" size="big" />
          ) : (
            <>
              <Image
                style={{ height: "150px", width: "150px" }}
                src={mediaPreview}
                alt="PostImage"
                centered
                size="medium"
                
              />
            </>
          )}
        </div> 
        <Divider hidden />

        <Button
          circular
          disabled={newPost.text === ""}
          content={<strong>Post</strong>}
          style={{ backgroundColor: "#1DA1F2", color: "white" }}
          icon="send"
          onSubmit={handleSubmit}
        />
      </Form>
      
      
      <Divider />
     
    </>
  );
}

export default CreatePost;