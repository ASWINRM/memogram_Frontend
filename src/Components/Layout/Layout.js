import React,{createRef,useState,useCallback,useRef,useEffect} from 'react'
import NewNavbar from './NewNavbar'
import {Container, Grid,Sticky,Ref,Visibility,Segment} from 'semantic-ui-react'
import SideMenu from './SideMenu';
import Searchbar from './Searchbar';
import Home from '../../screen/home'
import UpdatedHome from '../../screen/UpdatedHome'
import { createMedia } from "@artsy/fresnel";
import Mobilesidemenu from './Mobilesidemenu';
import Profile from '../../screen/profile';
import Notification from '../../screen/notification';
import axios from 'axios';
import io from 'socket.io-client'
import Chat from '../Chat/Chat'
const AppMedia = createMedia({
  breakpoints: { zero: 0, mobile: 549, tablet: 850, computer: 1080 }
});



const mediaStyles = AppMedia.createMediaStyle();
const { Media, MediaContextProvider } = AppMedia;
const Layout= ()=>{
    const ContextRef=createRef();
   const user=JSON.parse(localStorage.getItem('user'));
   const [home,sethome]=useState(true);
   const[activeState,SetactiveState]=useState('home');



   

 let socket=useRef()

useEffect(()=>{
  if(!socket.current){

    socket.current=io.connect('https://memogramapp.herokuapp.com');
    if(socket.current){
      console.log("machan connected")
      socket.current.emit('join',{userId:user._id})

      socket.current.on("connectedusers",({users})=>{
        if(users.length>0){
             console.log(users)
          
        }
      })
  }
}

return ()=>{
  if (socket.current) {
  socket.current.emit('disconnec',{userId:user._id})
 
  socket.current.off();
  }
}
},[])

function settingstate(state){
  SetactiveState(state);
  return state
}

const scrollToTop = async () => {
 sethome(!home);
window.scrollTo({
  top: 0,
  behavior: "smooth"
})
};

 function ChatAction() {

  const Axios = axios.create({
                 
      headers: {   "Content-Type": "application/json",Authorization: JSON.parse(localStorage.getItem('token'))}
    });
    
  let controller=new AbortController();
  let signal=controller.signal
  console.log("machi")
  try{
     let chating =async()=>{
          let res=await Axios.get(`https://memogramapp.herokuapp.com/api/chat`,{signal:signal});
         
          if(res){
              // console.log(res.data)
              console.log(res);
              localStorage.setItem('chats',JSON.stringify(res.data))
              SetactiveState(`messages/${res.data.ChatsToBeSent[0].messagesWith}`)
          }
      }

      chating();
  }catch(e){
     console.log(e);
  }
      return () => {
      // cancel the request before component unmounts
      controller.abort();
  };
      
   // eslint-disable-next-line react-hooks/exhaustive-deps
    


 
}

    return (
        <>
        <style>{mediaStyles}</style>
        {user?
        
        <MediaContextProvider>

        
        <div>
            
            <div style={{position:"sticky",zIndex:"1",top:"0%",width: "100%",display:"block"}} onClick={()=>scrollToTop()}>
           <NewNavbar scrollToTop={scrollToTop}></NewNavbar>
           </div>
           <Media greaterThanOrEqual="computer">
           <Ref innerRef={ContextRef}>
           
               <Grid columns='3'>
                   <Grid.Column floated="left"  mobile={0} tablet={8} computer={2}>
                       
                      <Sticky context={ContextRef} active={true} offset={85} >
                      
                      <SideMenu user={user} pc={true} settingstate={settingstate} activeState={activeState} ChatAction={ChatAction} ></SideMenu>
                      
                          
                        </Sticky> 
                   </Grid.Column>
                   <Grid.Column  mobile={16} tablet={4} computer={11}>
                     <Visibility context={ContextRef}>
                           {

                            (activeState==='home' ) && <Home socket={socket} ></Home>
                          }
                          {
                            activeState==='Updatehome' && <UpdatedHome ></UpdatedHome>
                          }
                          {
                            activeState===`${user.username}`  && <Profile username={user.username}></Profile>
                          }
                          {
                            activeState==='notification' && <Notification username={user.username}></Notification>
                          }
                          {
                            activeState.split('/')[0]==="anotherProfile" && <Profile username={activeState.split('/')[1]}></Profile>
                          }
                          {
                            (activeState.split('/')[0]==="messages" && socket.current)&& <Chat messagesWith={activeState.split('/')[1]} settingstate={settingstate}
                            socket={socket}></Chat>
                          }
                       </Visibility>
                   </Grid.Column>
                   <Grid.Column floated="left"  mobile={0} tablet={2} computer={3}>
                    <Sticky context={ContextRef} active={true} offset={85}>
                      <Segment basic>
                          <Searchbar settingstate={settingstate} mobile={'click'}></Searchbar>
                      </Segment>
                    </Sticky>
                   </Grid.Column>
               </Grid>
           </Ref>
           </Media>

           <Media between={["tablet", "computer"]}>
                <Ref innerRef={ContextRef}>
                  <Grid>
                   
                      <>
                        <Grid.Column floated="left" width={1}>
                          <Sticky context={ContextRef} active={true} offset={85}>
                            <SideMenu user={user} pc={false}  settingstate={settingstate}/>
                          </Sticky>
                        </Grid.Column>

                        <Grid.Column width={15}>
                          <Visibility context={ContextRef}>
                          {
                            (activeState==='home' && socket.current) && <Home socket={socket} ></Home>
                          }
                          {
                            activeState==='Updatehome' && <UpdatedHome ></UpdatedHome>
                          }
                          {
                            activeState===`${user.username}`  && <Profile username={user.username}></Profile>
                          }
                          {
                            activeState==='notification' && <Notification username={user.username}></Notification>
                          }
                          {
                            activeState.split('/')[0]==="anotherProfile" && <Profile username={activeState.split('/')[1]}></Profile>
                          }
                          {
                            (activeState.split('/')[0]==="messages" && socket.current)&& <Chat messagesWith={activeState.split('/')[1]} settingstate={settingstate}
                            socket={socket}></Chat>
                          }

                            </Visibility>
                        </Grid.Column>
                      </>
                  </Grid>
                </Ref>
              </Media>

              <Media between={["mobile", "tablet"]}>
                <Ref innerRef={ContextRef}>
                  <Grid>
                  
                      <>
                        <Grid.Column floated="left" width={2}>
                        <Sticky context={ContextRef} active={true} offset={85}>
                            <SideMenu user={user} pc={false}  settingstate={settingstate}/>
                          </Sticky>
                        </Grid.Column>

                        <Grid.Column width={14}>
                        <Visibility context={ContextRef}>
                        {
                            (activeState==='home' && socket.current) && <Home socket={socket} ></Home>
                          }
                          {
                            activeState==='Updatehome' && <UpdatedHome ></UpdatedHome>
                          }
                          {
                            activeState===`${user.username}`  && <Profile username={user.username}></Profile>
                          }
                          {
                            activeState==='notification' && <Notification username={user.username}></Notification>
                          }
                          {
                            activeState.split('/')[0]==="anotherProfile" && <Profile username={activeState.split('/')[1]}></Profile>
                          }
                          {
                            (activeState.split('/')[0]==="messages" && socket.current)&& <Chat messagesWith={activeState.split('/')[1]} settingstate={settingstate}
                            socket={socket}></Chat>
                          }
                        </Visibility>
                        </Grid.Column>
                      </>
                   
                  </Grid>
                </Ref>
              </Media>

              <Media between={["zero", "mobile"]}>
                <Mobilesidemenu user={user} pc={false} settingstate={settingstate} />
                <Grid>
                  <Grid.Column> <Visibility context={ContextRef}>
                          {
                            (activeState==='home' && socket.current) && <Home socket={socket} ></Home>
                          }
                          {
                            activeState==='Updatehome' && <UpdatedHome ></UpdatedHome>
                          }
                          {
                            activeState===`${user.username}`  && <Profile username={user.username}></Profile>
                          }
                          {
                            activeState==='notification' && <Notification username={user.username}></Notification>
                          }
                          {
                            activeState.split('/')[0]==="anotherProfile" && <Profile username={activeState.split('/')[1]}></Profile>
                          }
                           {
                            (activeState.split('/')[0]==="messages" && socket.current)&& <Chat messagesWith={activeState.split('/')[1]} settingstate={settingstate}
                            socket={socket}></Chat>
                          }
                    </Visibility></Grid.Column>
                </Grid>
              </Media>


        </div>
        </MediaContextProvider>

        :
        <div>
        
         <NewNavbar></NewNavbar>
        <Container style={{paddingTop:"1rem"}} text>
        
        </Container>
        </div>
        }
        
        </>
       
    )
}

export default Layout
