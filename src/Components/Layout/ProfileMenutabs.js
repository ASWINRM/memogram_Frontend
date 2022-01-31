import React from 'react';
import {  Menu, Segment,Icon } from 'semantic-ui-react'
function ProfileMenutabs({ activeitem,handleClick,userfollowstats,followerslength,followingslength,ownprofile,}) {
    // console.log(activeitem)
    return (
        <>
          <Menu  attached='top' tabular>
          <Menu.Item
            name='Profile'
            active={activeitem === 'profile'}
            onClick={()=>handleClick('profile')}
          />
          <Menu.Item
            name={`${userfollowstats.following.length} following `}
            active={activeitem === 'following'}
            onClick={()=>handleClick('following')}
          />
          <Menu.Item
            name={`${userfollowstats.followers.length} followers `}
            active={activeitem === 'followers'}
            onClick={()=>handleClick('followers')}
          />
          {
              ownprofile && (
                  <>
                <Menu.Item
                   name="Update Profile"
                   active={activeitem === 'update'}
                    onClick={()=>handleClick('update')}
                />  

                <Menu.Item
                   name="Settings"
                   active={activeitem === 'settings'}
                    onClick={()=>handleClick('settings')}
                > 
                <Icon name='setting'></Icon> Settings
                </Menu.Item>
                
                </>
              )
          }
         
        </Menu>
  
        </>
    );
}

export default ProfileMenutabs;