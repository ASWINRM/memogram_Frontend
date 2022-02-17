
import {useEffect,useState,useRef} from 'react';
import axios from 'axios';
import NotificationPortal from './NotificationPortal' 
import {NoPosts} from '../Components/Layout/NoData'
import {PostDeleteToastr} from '../Components/Layout/Toastr'
import CreatePost from '../Components/Post/CreatePost';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PlaceHolderPosts,EndMessage} from '../Components/Layout/PlaceHolderGroup'
import CardPost from '../Components/Post/CardPost.js';
import { Segment } from 'semantic-ui-react';
import io from 'socket.io-client'
import { Dimmer, Loader } from 'semantic-ui-react'


const UpdatedHome=()=>{
  const [posts,setposts] = useState([]);
  const [hasmore, sethasmore] = useState(false);
  const [ShowToastr, setShowToastr] = useState(false);
  const logintoken=JSON.parse(localStorage.getItem('token'));
  const [PageNumber, setPageNumber] = useState(1);
  const user=JSON.parse(localStorage.getItem('user'));
  const [loading, setloading] = useState(true);
  const header=window.location.pathname.split('/')[1]
  const [newNotification,setnewNotification]=useState(null);
  const [notificationPopup, showNotificationPopup] = useState(false);
  console.log(JSON.parse(localStorage.getItem('user')))
  let socket=useRef()

  useEffect(()=>{
    if(!socket.current){
      socket.current=io.connect('https://memogramapp.herokuapp.com');
      if(socket.current){
        socket.current.emit('join',{userId:user._id})

        socket.current.on("connectedusers",({users})=>{
          // if(users.length>0){
          //      console.log(users)
            
          // }
        })
    }
  }
},[])
useEffect(()=>{
  if(showNotificationPopup===false){
   setnewNotification("");
  }
},[showNotificationPopup])

useEffect(()=>{
  if(socket.current){
 socket.current.on("newlikenotification",({data})=>{
   console.log(data);
    setnewNotification(data)
    showNotificationPopup(true)
 })

 socket.current.on('newcommentNotification',({data})=>{
   console.log("comment received")
   console.log(data);
  setnewNotification(data)
  showNotificationPopup(true)
 })
  }
},[])



useEffect(()=>{
    return ()=>{
    
   if (socket.current) {
    socket.current.disconnect();
    socket.current.off();
  }
    };
  },[])

 function settingpost(postid,post){
    // console.log(postid);
    if(postid){
      // console.log(postid);
      setposts((prev)=>prev.filter(pos=>pos._id!==postid));
      setShowToastr(true);
    }
   
  }

  useEffect(()=>{
    if(header !=='home'){
      
            setposts(null)
  
    }
  
},[header])
 useEffect(() => {
   if(user){
    // console.log(user);
     document.title=`WelCome ${user.name.toString().split(" ")[0]}`;
     fetchDataOnScroll();
   }
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);

 useEffect(() => {
  
  ShowToastr && setTimeout(()=>setShowToastr(false),3000);
 }, [ShowToastr])

 
// useEffect(async()=>{
//   console.log(posts);
// },[posts]);



 const fetchDataOnScroll=async ()=>{

  try{
  
   
    // console.log(`http://localhost:5000/api/post/${PageNumber}`);
    var res=await axios.get(`https://memogramapp.herokuapp.com/api/post/${PageNumber}`,{
      headers:{
       
         Authorization: JSON.parse(localStorage.getItem('token'))
      }
    })
    
    // if(res){
    //   console.log(res);
    // }else{
    //   console.log(res);
    // }
    // console.log("token"+" "+logintoken);
    // console.log(PageNumber);
    // console.log("hi"+res);
    if(res.data==="NoPosts"){
      setShowToastr(false);
      // console.log(res.data);
    }else {
      setposts((prev)=>[...prev,...res.data]);
      setPageNumber((prev)=>prev+1);
      // console.log(res.data);
    }

   
  }catch(e){
    // console.log(e);
  }
        
 }

 if(posts.length===0) {
  setTimeout(()=>{
    setloading(false);
  },2000)
  return(
    <div style={{"marginTop":"5%","marginLeft":"5%"}}>
 <Segment>
 
  <CreatePost user={user} setPosts={setposts} logintoken={logintoken} setloading={setloading}></CreatePost>
  {
       loading && 
       <Dimmer active inverted>
       <Loader size='massive'>Loading</Loader>
        </Dimmer>
  
     

     }
     {
       ShowToastr && <PostDeleteToastr></PostDeleteToastr>
     }
   <NoPosts></NoPosts>
    </Segment>
   
    </div>
    
  
  )
 }
 

 if(posts.length>0){
   setTimeout(()=>{
     setloading(false);
   },7000)
  return(
    <>
   <div style={{margin:"20px"}}></div>
   {notificationPopup && newNotification !== null && (
        <NotificationPortal
          newNotification={newNotification}
          notificationPopup={notificationPopup}
          showNotificationPopup={showNotificationPopup}
        />
      )}

     <CreatePost user={user} setPosts={setposts} setloading={setloading}></CreatePost>
     {
       ShowToastr && <PostDeleteToastr></PostDeleteToastr>
     }
      
     {
       loading && 
       <Dimmer active inverted>
       
      
       <Loader size='massive'>Loading</Loader>
        
        </Dimmer>
  
     

     }
     {
       loading===false &&  <Segment>
       {/* <CreatePost user={user} setPosts={setposts}></CreatePost> */}
      <InfiniteScroll
     hasMore={hasmore}
     next={fetchDataOnScroll}
     dataLength={posts.length}
     loader={<PlaceHolderPosts></PlaceHolderPosts>} 
     endMessage={
      <EndMessage></EndMessage>
     }
 
     > 
       {posts.map((post)=>(
       <CardPost
       key={post._id}
       post={post}
       posts={posts}
       setShowToastr={setShowToastr}
       settingpost={settingpost}
       socket={socket}
       ></CardPost>
       ))}
      </InfiniteScroll> 
     </Segment>
     }
 

    </>
   )
 }

 
}


export default UpdatedHome;