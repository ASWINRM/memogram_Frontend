import React,{useCallback, useState}  from 'react';
import {  Image,  List,Loader,Button} from 'semantic-ui-react'
import {userfollow,userunfollow} from '../../utils/followaction'
import { Link } from 'react-router-dom';
import {NoFollowData} from './NoData'

function Following({userfollowstats,setuserfollowstats,userinfo,profile}) {
    //  console.log( userfollowstats,userinfo,profile);
     const currentuser=JSON.parse(localStorage.getItem('user'));
    //  console.log(currentuser)
     const [loading,setloading]=useState(false);
    //  let [isfollowing, setisfollowing] = useState(false);


     

     let followuser=useCallback((id)=>{
        //  console.log('followuser')
        setuserfollowstats(prev=>({
            ...prev,
            following:[...prev.following,{user:id}]
        }))

      
     },[userfollowstats])
     
    let unfollowuser=useCallback((id)=>{
        // console.log("unfollow user")
        setuserfollowstats(prev=>({
            ...prev,
            following:prev.following.filter((f)=>f.user!==id)
        }))
        
     
    },[userfollowstats])
     
    return (
        <div>
            
          {
            loading && 
            <Loader size='large'></Loader>
             
          }
          {
               userinfo.userfollowings.length>0 ? userinfo.userfollowings.map((userfollower)=>{
            //    setisfollowing(userfollowstats.following.filter((followinguser)=>followinguser.user===userfollower.user._id).length>0)
                let isfollowing=(userfollowstats.following.filter((followinguser)=>followinguser.user===userfollower.user._id)).length>0
     
                  return (
                    
                    <List celled  size='massive' divided verticalAlign="middle" key={userfollower.user._id} >
                    
                    <List.Item  >
                    {/* <Image avatar src={require(`../../images/${userfollower.user.profilepicurl}`).default} /> */}
                    <Image avatar src={userfollower.user.profilepicurl} />
               <List.Content >
               <Link to={`/${userfollower.user.username}`} style={{textDecoration:"none"}}>
               <List.Header >{userfollower.user.username}</List.Header>
               </Link>
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
                              setloading(false);
                               isfollowing=!isfollowing
                             
                            }}
                           />
                   )}
           
           </List.Content>
            </List.Item>
           
            </List>
          
                  )
                      
            
            
           
               }):< NoFollowData followersComponent={false} followingComponent={true}></NoFollowData>
          }
             
        </div>
    );
}

export default Following;