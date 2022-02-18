import React,{useState,useEffect,memo} from 'react';
import { Divider, Comment, Icon, List } from "semantic-ui-react";
import {useHistory} from 'react-router-dom'
import calculateTime from '../../utils/calculateTime'

function Chatlist({chat, connectedusers,deletechat}) {
const history=useHistory();

const querymsgwith=window.location.pathname.split("/")[2]

const [isOnline,setisOnline]=useState(false);
useEffect(()=>{
setisOnline(connectedusers&&connectedusers.length>0&&connectedusers.filter((users)=>users.userId===chat.messagesWith).length>0
)

},[connectedusers,chat.messagesWith])
return  (
    <>
    {
       chat?<List selection>
       <List.Item
          active={chat.messagesWith===querymsgwith}
         onClick={()=>{
             history.push(`/messages/${chat.messagesWith}`)
         }}
       >

           <Comment>
               <Comment.Avatar  src={chat.profilepicurl}></Comment.Avatar>
               
               <Comment.Content>
                   <Comment.Author as="a">{chat.name}</Comment.Author>
                   {
                   isOnline && <Icon name='circle' color='green'></Icon>
               }
                   <Comment.Metadata>
                       <div>
                           {calculateTime(chat.data)}
                       </div>
                       
                       
                       <Comment.Text >
                           {chat.lastMessage.length>20?`${chat.lastMessage.substring(0,20)}...`:`${chat.lastMessage}`}
                       </Comment.Text>
                      
                       
                   </Comment.Metadata>
               </Comment.Content>
               <div style={{position:"absolute",right:"10px",cursor:"pointer"}} onClick={()=>deletechat(chat.messagesWith)}>
                           <Icon name='trash alternate' color='red'></Icon>
                       </div>
           </Comment>
          
       </List.Item>
   </List>
   
   :<div>poda ped</div>
    }
    <Divider></Divider>
      </>    
    
)

  
}

export default memo(Chatlist);