import axios from 'axios';
import catcherror from './catcherror';
import Cookies from 'js-cookie';

export  const  submitNewPost=async( text, location, picurl, setPosts, setNewPost, setError,picUrl)=>{

        try{
            const logintoken=JSON.parse(localStorage.getItem('token'));
            picurl=JSON.parse(localStorage.getItem('postingpic'))
            // console.log("submitting the post");
            // console.log(picurl);
            const Axios = axios.create({
               
                headers: {   "Content-Type": "application/json",Authorization: logintoken}
              });
            const token=logintoken;
            
          
                const res=await Axios.post('https://memogramapp.herokuapp.com/api/post/newpost',{
                    text,location,picurl:picurl
               });
               if(res){
                  //  console.log(res);
                let Newpost={
                    _id:res.data[0]._id,
                    text:res.data[0].text,
                    location:res.data[0].location,
                    likes:res.data[0].likes,
                    picurl:res.data[0].picUrl || picurl,
                    comments:res.data[0].comments,
                    user:res.data[0].user,
                   
                }
                setPosts((prev)=>[Newpost,...prev]);
                // console.log(Newpost);
            
        }
  
            
           
           setNewPost({text:"",location:""});


        }catch(e){
            const errormsg=catcherror(e);
            setError(e);
              // console.log(e);
        }
  

}

export async function  deletePost(postId,setposts,setShowToastr,setError,posts,settingpost){
  // if(settingpost instanceof Function){
  //   console.log("settingpost is a function in deletepost");
  // }else{
  //   console.log(settingpost);
  //   console.log(typeof(settingpost));
  // }
    try{
        const Axios = axios.create({
                
            headers: {  "Content-Type": "application/json", Authorization: JSON.parse(localStorage.getItem('token')) }
          });
        // console.log("postId "+postId )
        let res=await Axios.put(`https://memogramapp.herokuapp.com/api/post/delete/${postId}`);
       if(res){
        //  console.log(res);
         let post=res.data  
        //  console.log(post);
         settingpost(postId,posts);
        
       }
       
    }catch(e){
      const errormsg=catcherror(e);
      setError(errormsg)
      // console.log(e);
    }
}

export async function likePost(postId,userId,setlikes,like,isLiked){

    try{
        // console.log("isliked "+isLiked);
        // console.log(like);
        const Axios = axios.create({
                
            headers: {  "Content-Type": "application/json",Authorization: JSON.parse(localStorage.getItem('token')) }
          });

          if(like){
              // console.log("inside true");
              // console.log(postId);
             let res= await Axios.post(`https://memogramapp.herokuapp.com/api/post/liking/${postId}`);
             
              setlikes((prev)=>[...prev,{user:userId}])
              isLiked=true;
          }else{
            // console.log("inside false");
              await Axios.post(`https://memogramapp.herokuapp.com/api/post/dislike/${postId}`);
              setlikes((prev)=>prev.filter(like=>like.user!==userId));
              isLiked=false;
          }
    }catch(e){
      const errormsg=catcherror(e);
     
      // console.log(e);
    }
}

export async function postComment(postId,user,text,setcomments,settext){
     
    try{
        const Axios = axios.create({
                
            headers: {  "Content-Type": "application/json",Authorization:  JSON.parse(localStorage.getItem('token')) }
          });
    
          const res=await Axios.post(`https://memogramapp.herokuapp.com/api/post/commenting/${postId}`,{text});
          
          setcomments((prev)=>[res.data,...prev]);
          settext("");
    }catch(e){
        // console.log(e);
    }
}

export async function deleteComment(postId,commentId,setComments, settingcomments){
    try{
      // console.log("deletecomment action");
        const Axios = axios.create({
                
            headers: {"Content-Type": "application/json", Authorization:JSON.parse(localStorage.getItem('token'))  }
          });

        var res=await Axios.put(`https://memogramapp.herokuapp.com/api/post/comment/delete/${postId}/${commentId}`);
        if(res){
          // console.log(res.data);
          settingcomments(commentId);
        }
    }catch(e){
      //  console.log(e);
    }
}