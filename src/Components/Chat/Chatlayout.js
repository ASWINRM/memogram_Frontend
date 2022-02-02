import React,{createRef} from 'react'

import NewNavbar from '../Layout/NewNavbar'
import {Container, Grid,Sticky,Ref} from 'semantic-ui-react'
import SideMenu from '../Layout/SideMenu'
import Chat from './Chat'

import { createMedia } from "@artsy/fresnel";
import Mobilesidemenu from '../Layout/Mobilesidemenu';
const AppMedia = createMedia({
    breakpoints: { zero: 0, mobile: 549, tablet: 850, computer: 1080 }
  });
  
  const mediaStyles = AppMedia.createMediaStyle();
  const { Media, MediaContextProvider } = AppMedia;
function Chatlayout(props) {
    const ContextRef=createRef();
   const user=JSON.parse(localStorage.getItem('user'));
    return (
        <>
         <style>{mediaStyles}</style>
        {user?
        <>
        <MediaContextProvider>

        
        <div>
            
            <div style={{position:"sticky",zIndex:"1",top:"0%",width: "100%",display:"block"}}>
           <NewNavbar  ></NewNavbar>
           </div>
           <Media greaterThanOrEqual="computer">
           <Ref innerRef={ContextRef}>
           
               <Grid columns='3'>
                  <Grid.Column  mobile={0} tablet={8} computer={2}>
                       
                      <Sticky context={ContextRef} active={true} offset={85} >
                      
                      <SideMenu user={user} pc={true} ></SideMenu>
                        </Sticky> 
                   </Grid.Column>

                   <Grid.Column floated="left" mobile={16} tablet={6} computer={14}>
                     <Chat></Chat>
                   </Grid.Column>
                
               </Grid>
           </Ref>
           </Media>

           <Media between={["tablet", "computer"]}>
                <Ref innerRef={ContextRef}>
                  <Grid>
                   
                      <>
                        <Grid.Column  mobile={0} tablet={8} computer={2}>
                       
                      <Sticky context={ContextRef} active={true} offset={85} >
                      
                      <SideMenu user={user} ></SideMenu>
                        </Sticky> 
                   </Grid.Column>

                   <Grid.Column floated="left" >
                     <Chat></Chat>
                   </Grid.Column>
                   </>
               </Grid>
                      
                  
                </Ref>
            </Media>

              <Media between={["mobile", "tablet"]}>
                <Ref innerRef={ContextRef}>
                  <Grid>
                  
                      <>
                        <Grid.Column  mobile={0} tablet={8} computer={2}>
                       
                      <Sticky context={ContextRef} active={true} offset={85} >
                      
                      <SideMenu user={user} ></SideMenu>
                        </Sticky> 
                       </Grid.Column>

                   <Grid.Column floated="left" >
                     <Chat></Chat>
                   </Grid.Column>
                    </>
               </Grid>
                      
                   
                 
                </Ref>
              </Media>

              <Media between={["zero", "mobile"]}>
                <Mobilesidemenu user={user} pc={false} />
                
                  <Grid>
                     <>
                   <Grid.Column floated="left" >
                     <Chat></Chat>
                   </Grid.Column>
                    </>
               </Grid>
               
              </Media>


        </div>
           </MediaContextProvider>
           </>
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

export default Chatlayout;