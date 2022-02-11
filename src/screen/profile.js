import React from 'react'
import axios from 'axios'
import { useState,useEffect} from 'react'

import { Alert } from '@mui/material'
import { Grid } from 'semantic-ui-react'
import ProfileMenutabs from '../Components/Layout/ProfileMenutabs'
import ProfileHeader from '../Components/Layout/ProfileHeader'

import CardPost from '../Components/Post/CardPost'
import { NoProfilePosts } from '../Components/Layout/NoData'
import { PostDeleteToastr } from '../Components/Layout/Toastr'
import { Dimmer,Loader } from 'semantic-ui-react'
import Followers from '../Components/Layout/Followers'
import Following from '../Components/Layout/Following'
import Updateprofile from '../Components/Layout/Updateprofile'
import Settings from '../Components/Layout/Settings'
 function Profile (){

    let username=window.location.pathname.split('/')[1]
    // console.log(username)
    const [posts,setposts]=useState([])
    const [loading,setloading]=useState(true)
    const [userinfo,setuserinfo]=useState()
    const [activeitem,setactiveitem]=useState('profile')
    const [userfollowstats,setuserfollowstats]=useState()
    const [ownprofile,setownprofile]=useState()
    const [followingslength,setfollowingslength]=useState()
    const [followerslength,setfollowerslength]=useState()
    const [userfollowings,setuserfollowings]=useState()
    const [userfollowers,setuserfollowers]=useState()
    const handleClick=(item)=>(setactiveitem(item))
    const [user,setuser]=useState()
    const  [profile,setprofile]=useState()
 
    const [ShowToastr,setShowToastr]=useState(false)
   
    

    useEffect(()=>{
  if(activeitem!=='update' || activeitem!=='following' || activeitem!=='followers' || activeitem!=='settings' ){
    (async function() {
        try {
            await Promise.all([getuserinfo(), getposts(),getuserfollowstatstics()]);
           
        } catch (e) {
            // console.error(e);
        }
    })();

  }

//   console.log(activeitem)
        
  // eslint-disable-next-line react-hooks/exhaustive-deps
        
    },[username]);

  



    useEffect(()=>{
        console.log(userfollowstats)
        // console.log(userinfo)
        let user=JSON.parse(localStorage.getItem('user'));
        if(userinfo && user){
             if(userinfo.user._id===user._id||userinfo.user.email===user.email ){
                setownprofile(true);
             }else{
                 setownprofile(false);
             }
         
        }
       
    },[userfollowstats,userinfo])


    useEffect(()=>{
        if(userinfo){
            if(username!==userinfo.user.username){
                setposts(null)
                setuserinfo(null)
                setuserfollowstats(null)
                setfollowerslength(null);
                setfollowingslength(null);
                setuser(null)
                setprofile(null)
                
            }
        }
      
    },[username,userinfo])

   

    function settingpost(postid,post){
        // console.log(postid);
        if(postid){
        //   console.log(postid);
          setposts((prev)=>prev.filter(pos=>pos._id!==postid));
          setShowToastr(true);
        }
    }
      
    
function followuser(id){
    // console.log('followuser')
   setuserfollowstats(prev=>({
       ...prev,
       following:[...prev.following,{user:id}]
   }))
}
function unfollowuser(id){
  //  console.log("unfollow user")
   setuserfollowstats(prev=>({
       ...prev,
       following:prev.following.filter((f)=>f.user!==id)
   }))
   
  
}
  

    // useEffect(()=>{
    //     console.log(username);
    // },[username])

    useEffect(()=>{
        {ShowToastr && setTimeout(() => setShowToastr(false), 3000)}
    },[ShowToastr])

    const Axios=axios.create({
                
        headers: {  "Content-Type": "application/json",Authorization:  JSON.parse(localStorage.getItem('token')) }
      });

      const getuserinfo=async()=>{
          
        setloading(true);
          try{
            var res=await Axios.get(`https://memogramapp.herokuapp.com/api/profile/${username}`);
            if(res){
                console.log(res.data)
                setuser(res.data.user);
                setprofile(res.data.profile);
                setfollowerslength(res.data.followerslength)
                setfollowingslength(res.data.followingslenght)
                setuserfollowings(res.data.userfollowings)
                setuserfollowers(res.data.userfollowers)
              
               
                  setuserinfo(res.data)
            }
          }catch(e){
            //   console.log(e);
          }
          setloading(false);
        
       
      }

        const getposts=async ()=>{
            setloading(true);
            try{
               var postres=await Axios.get(`https://memogramapp.herokuapp.com/api/post/userpost/${username}`)
                if(postres){
                    console.log(postres.data)
                    if(postres.data!=="noposts"){
                        setposts(postres.data);
                        sessionStorage.setItem('posts',JSON.stringify(postres.data))
                    }else{
                        setposts([])
                    }
                  
                }
               
            }catch(e){
            //   console.log(e);
              Alert("Error Loading Image");
            }
            setloading(false);
            
        }

        const getuserfollowstatstics=async ()=>{
            setloading(true);
            try{
                const followingstats=await Axios.get(`https://memogramapp.herokuapp.com/api/followtask/followings`);

                const followerstats=await Axios.get(`https://memogramapp.herokuapp.com/api/followtask/followers`);
    
                if(followingstats && followerstats){
                    
                    setuserfollowstats({following:followingstats.data,followers:followerstats.data})
                }
            }catch(e){
                // console.log(e)
            }
            setloading(false);
        }

        

        return (
            <>
            
           {ShowToastr && <PostDeleteToastr></PostDeleteToastr>}
           {
               loading?<Dimmer active inverted>
       
      
               <Loader size='massive'>Loading</Loader>
              
                </Dimmer>:
                 <Grid stackable>
                  <Grid.Row>
                      {/* {(followerslength && followingslength && userfollowstats)? */}
                      {
                        (profile && userfollowstats&& user )&&
                        <ProfileMenutabs
                        activeitem={activeitem}
                        handleClick={handleClick}
                        userfollowstats={userfollowstats}
                        followerslength={followerslength}
                        followingslength={followingslength}
                        ownprofile={ownprofile}
                        ></ProfileMenutabs>
                      }
                      
                     
                      {/* :<Dimmer></Dimmer>} */}
                  </Grid.Row>
                  <Grid.Column width={16}>
                  {(profile && userfollowstats&& user && activeitem==="profile")?
                  <Grid.Row>
                      <ProfileHeader
                       ownprofile={ownprofile}
                        profile={profile}
                        userfollowstats={userfollowstats}
                        user={user}
                        setuserfollowstats={setuserfollowstats}
                        followuser={followuser}
                        unfollowuser={unfollowuser}
                      ></ProfileHeader>
                  </Grid.Row>:<Dimmer><Loader></Loader></Dimmer> }
                  <Grid.Row>
                  {
                      (activeitem==='followers'&& userfollowstats&& userinfo&&profile)&& (
                       <Followers
                      userfollowstats={userfollowstats}
                      setuserfollowstats={setuserfollowstats}
                      userinfo={userinfo}
                      profile={profile}
                      ></Followers>
                      )
                    
                  }
                  {
                     
                      (activeitem==='following' && userfollowstats&& userinfo&&profile)&&(
                      <Following
                      userfollowstats={userfollowstats}
                      setuserfollowstats={setuserfollowstats}
                      userinfo={userinfo}
                      profile={profile}
                      ></Following>)
                  }

                  
              
                     
                      {
                         (activeitem!=='update'&& activeitem!=='settings' && profile && userfollowstats&& user) ? 
                         (posts && posts.length>0)?posts.map((post)=>(
                            <CardPost
                            post={post}
                            setposts={setposts}
                            posts={posts}
                            settingpost={settingpost}
                            ></CardPost>
                          )):<NoProfilePosts></NoProfilePosts>:<p></p>
                        
                      }
                  

                
                      {
                        (activeitem==='update' &&profile) && <Updateprofile profile={profile} setactiveitem={setactiveitem}></Updateprofile>
                      }
                  
                      {
                          (activeitem==='settings') && <Settings></Settings>
                      }
                  </Grid.Row>
                  
                  </Grid.Column>
                  
                  


              </Grid>
           }
              
            </>
        ) 



    
   
}


export default Profile;