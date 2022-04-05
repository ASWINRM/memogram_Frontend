import axios from 'axios';
import catcherror from './catcherror';


export  const  submitNewPost=async( text, location, picurl, setPosts, setNewPost, setError,picUrl)=>{

        try{
            const logintoken=JSON.parse(localStorage.getItem('token'));
            picurl=JSON.parse(localStorage.getItem('postingpic'))
            // console.log("submitting the post");
            // console.log(picurl);
            const Axios = axios.create({
               
                headers: {   "Content-Type": "application/json",Authorization: logintoken}
              });
            
            
          
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
          
            catcherror(e);
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
  let user=JSON.parse(localStorage.getItem('user'))
    try{
        const Axios = axios.create({
                
            headers: {  "Content-Type": "application/json",Authorization:JSON.parse(localStorage.getItem('token')) }
          });
        console.log("postId "+postId )
      if (posts.length > 0) {
        console.log("post length greter than 0");
              console.log(posts);
              setposts((prev)=>prev.filter(pos=>pos._id!==postId));
              settingpost();
      }

        //  console.log(post);
       
       let res= await Axios.put(`https://memogramapp.herokuapp.com/api/post/delete/${postId}`,{userid:user._id});
      if (res) {
        console.log(res);
       }
       
    }catch(e){
      const errormsg=catcherror(e);
      catcherror(errormsg)
      // console.log(e);
    }
}

export async function likePost(postId,user,setLikes,like,isLiked){

    try{
        console.log("isliked "+isLiked);
        console.log(like);
       

          if(like){
          
              console.log(like);
              setLikes((prev)=>prev.filter(like=>like.user._id!==user._id));
            
             
  
          }else{
     
            setLikes((prev)=>[...prev,{user:user}])
            // await axios.post(`https://memogramapp.herokuapp.com/api/post/liking/${postId}`,{userId:user._id});
         
      
          }
    }catch(e){
      // const errormsg=catcherror(e);
      catcherror(e)
      // console.log(e);
    }
}

export async function postComment(postId,user,text,setcomments,settext,addingcomments){
     
    try{
      
      console.log(text);
      
    
          // const res=await Axios.post('https://memogramapp.herokuapp.com/api/post/commenting/'+postId,{text});
         
          
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

        await Axios.put(`https://memogramapp.herokuapp.com/api/post/comment/delete/`+postId+'/'+commentId);
       
    }catch(e){
      //  console.log(e);
    }
}
