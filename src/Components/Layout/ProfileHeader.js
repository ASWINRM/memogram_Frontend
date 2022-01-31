import React, { useEffect, useState } from 'react';
import { Segment, Image, Grid, Divider, Header, Button, List } from "semantic-ui-react";
import {userfollow,userunfollow} from '../../utils/followaction'

function ProfileHeader({ownprofile, profile, userfollowstats, user,setuserfollowstats}) {
    const [loading, setLoading] = useState(false);
// console.log(ownprofile,profile,userfollowstats,user)
const [isfollowing, setisfollowing] = useState((userfollowstats.following.length>0 && userfollowstats.following.filter((following)=>following.user===user._id)).length>0?true:false);


// useEffect(()=>{
//     console.log(userfollowstats.following.length>0 && userfollowstats.following.filter((following)=>following.user===user._id).length>0)
//     console.log(isfollowing);
// },[isfollowing])

// useEffect(()=>{
//   console.log(userfollowstats)
// },[userfollowstats])

function followuser(id){
    // console.log('followuser')
   setuserfollowstats(prev=>({
       ...prev,
       following:[...prev.following,{user:id}]
   }))

 
   setisfollowing(true);
}
function unfollowuser(id){
  //  console.log("unfollow user")
   setuserfollowstats(prev=>({
       ...prev,
       following:prev.following.filter((f)=>f.user!==id)
   }))
   
   setisfollowing(false);
}

return (
        <>

        
           <Segment>
               <Grid stackable>
                     <Grid.Column width={11}>
                      <Grid.Row>
                      <Header
                                  as="h2"
                                     content={profile.user.name}
                                   style={{ marginBottom: "5px" }}
                     />

                      </Grid.Row>
                      <Grid.Row stretched>
                          {
                              profile.bio
                          }
                          <Divider hidden />

                      </Grid.Row>
                      <Grid.Row>
              {profile.social ? (
                <List>
                  <List.Item>
                    <List.Icon name="mail" />
                    <List.Content content={profile.user.email} />
                  </List.Item>

                  {profile.social.facebook && (
                    <List.Item>
                      <List.Icon name="facebook" color="blue" />
                      <List.Content
                        style={{ color: "blue" }}
                        content={profile.social.facebook}
                      />
                    </List.Item>
                  )}

                  {profile.social.instagram && (
                    <List.Item>
                      <List.Icon name="instagram" color="red" />
                      <List.Content
                        style={{ color: "blue" }}
                        content={profile.social.instagram}
                      />
                    </List.Item>
                  )}

                  {profile.social.youtube && (
                    <List.Item>
                      <List.Icon name="youtube" color="red" />
                      <List.Content
                        style={{ color: "blue" }}
                        content={profile.social.youtube}
                      />
                    </List.Item>
                  )}

                  {profile.social.twitter && (
                    <List.Item>
                      <List.Icon name="twitter" color="blue" />
                      <List.Content
                        style={{ color: "blue" }}
                        content={profile.social.twitter}
                      />
                    </List.Item>
                  )}
                </List>
              ) : (
                <>No Social Media Links </>
              )}
            </Grid.Row>

                   </Grid.Column>
            <Grid.Column width={5} stretched style={{ textAlign: "center" }}>
            <Grid.Row>
              <Image size="large" avatar src={user.profilepicurl} />
            </Grid.Row>
            <br />
            {
                (ownprofile===false) && (
                    <Button
                    compact
                    loading={loading}
                    disabled={loading}
                    content={isfollowing ? "Following" : "Follow"}
                    icon={isfollowing ? "check circle" : "add user"}
                    color={isfollowing ? "instagram" : "twitter"}
                    onClick={async () => {
                      setLoading(true);
                     isfollowing
                        ? 
                            await userunfollow(profile.user._id,unfollowuser)
                           
                        : 
                            await userfollow(profile.user._id,followuser);
                          
                    setisfollowing(!isfollowing)
                            setLoading(false);

                    }}
                  />
    
                )
            }

     </Grid.Column>


               </Grid>
               </Segment> 
        </>
    );
}

export default ProfileHeader;  