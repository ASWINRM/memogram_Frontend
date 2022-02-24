import React, { useCallback } from 'react';
import {useState,useEffect} from 'react'
import {  Image,  List,Loader,Button} from 'semantic-ui-react'
import {userfollow,userunfollow} from '../../utils/followaction'
import { NoFollowData} from './NoData'
function Followers({ userfollowstats,setuserfollowstats,userinfo}) {
  const [loading,setloading]=useState(false);
  const currentuser=JSON.parse(localStorage.getItem('user'));
    //  console.log( userfollowstats,userinfo,profile);
    //  console.log(userinfo.userfollowers.length)
    
     

     useEffect(()=>{
        // console.log(userfollowstats)
        sessionStorage.removeItem('userfollowstats');
        sessionStorage.setItem('userfollowstats',userfollowstats)
  
     },[userfollowstats])
     let followuser=useCallback((id)=>{
        setuserfollowstats(prev=>({
         ...prev,
        following:[...prev.following,{user:id}]
        }))
        sessionStorage.setItem('userfollowstats',userfollowstats)
      
      },[userfollowstats])

     let unfollowuser=useCallback((id)=>{
    setuserfollowstats(prev=>({
        ...prev,
        following:prev.following.filter((f)=>f.user!==id)
    }))
    sessionStorage.setItem('userfollowstats',userfollowstats)
  
   },[userfollowstats])
     
    return (
        <>
       
        
          {
             userinfo.userfollowers.length>0 ? (userinfo.userfollowers.map((userfollower)=>{
                 let isfollowing=userfollowstats.following.filter((followinguser)=>followinguser.user===userfollower.user._id).length>0
                 
               
                return (
                    <List celled  size='massive' divided verticalAlign="middle" key={userfollower.user._id}>
                   <List.Item>
                         {/* <Image avatar src={require(`../../images/${userfollower.user.profilepicurl}`).default} /> */}
                         <Image avatar src={userfollower.user.profilepicurl} />
                    <List.Content>
                    <List.Header>{userfollower.user.username}</List.Header>
                    
                   </List.Content>
                   <List.Content floated="right">
                        {userfollower.user._id !== currentuser._id && (
                                <Button
                                  color={isfollowing ? "instagram" : "twitter"}
                                  icon={isfollowing ? "check" : "add user"}
                                 content={isfollowing ? "Following" : "Follow"}
                                 loading={loading}
                                 onClick={async() => {
                                    setloading(true)
                                  isfollowing?await userunfollow(userfollower.user._id,unfollowuser):await userfollow(userfollower.user._id,followuser)
                                  setloading(false)
                                  isfollowing=!isfollowing

                                 }}
                                />
                        )}
                
                </List.Content>
                 </List.Item>
                 
                 </List>
              )
                 })
          
            ): (< NoFollowData followersComponent={true} followingComponent={false}></NoFollowData>  )
             
          }
         
          
          
        </>
    );
}



export default Followers;