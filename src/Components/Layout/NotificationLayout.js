import NewNavbar from './NewNavbar'
import {Container, Grid,Sticky,Ref,Visibility,Segment} from 'semantic-ui-react'
import SideMenu from './SideMenu';
import Searchbar from './Searchbar';
import Notification from '../../screen/notification';
import React,{createRef} from 'react';
import { createMedia } from "@artsy/fresnel";
import Mobilesidemenu from './Mobilesidemenu';
const AppMedia = createMedia({
    breakpoints: { zero: 0, mobile: 549, tablet: 850, computer: 1080 }
  });
  
  const mediaStyles = AppMedia.createMediaStyle();
  const { Media, MediaContextProvider } = AppMedia;
function NotificationLayout(props) {
    const ContextRef=createRef();
   
    const user=JSON.parse(localStorage.getItem('user'));
    // if(user){
    //     console.log("user :"+user);
    // }
    return (
      
             
 
        <>
         <style>{mediaStyles}</style>
       {
           user?
           <MediaContextProvider>
   
           
           <div>
               
               <div style={{position:"sticky",zIndex:"1",top:"0%",width: "100%",display:"block"}}>
              <NewNavbar  ></NewNavbar>
              </div>
              <Media greaterThanOrEqual="computer">
              <Ref innerRef={ContextRef}>
              
                  <Grid columns='3'>
                      <Grid.Column floated="left"  mobile={0} tablet={8} computer={2}>
                          
                         <Sticky context={ContextRef} active={true} offset={85} >
                         
                         <SideMenu user={user} pc={true} ></SideMenu>
                         
                             
                           </Sticky> 
                      </Grid.Column>
                      <Grid.Column  mobile={16} tablet={4} computer={11}>
                          <Visibility context={ContextRef} ><div style={{marginTop:"20px"}}></div><Notification></Notification></Visibility>
                      </Grid.Column>
                      <Grid.Column floated="left"  mobile={0} tablet={2} computer={3}>
                       <Sticky context={ContextRef} active={true} offset={85}>
                         <Segment basic>
                             <Searchbar></Searchbar>
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
                               <SideMenu user={user} pc={false} />
                             </Sticky>
                           </Grid.Column>
   
                           <Grid.Column width={15}>
                               <Visibility context={ContextRef} ><div style={{marginTop:"20px"}}></div><Notification></Notification></Visibility>
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
                               <SideMenu user={user} pc={false} />
                             </Sticky>
                           </Grid.Column>
   
                           <Grid.Column width={14}>
                         <Visibility context={ContextRef} ><div style={{marginTop:"20px"}}></div><Notification></Notification></Visibility>
                           </Grid.Column>
                         </>
                      
                     </Grid>
                   </Ref>
                 </Media>
   
                 <Media between={["zero", "mobile"]}>
                   <Mobilesidemenu user={user} pc={false} />
                   <Grid>
                     <Grid.Column> 
                        <Visibility context={ContextRef} ><div style={{marginTop:"20px"}}></div><Notification></Notification></Visibility>
                    </Grid.Column>
                   </Grid>
                 </Media>
   
   
           </div>
           </MediaContextProvider>:
        <div style={{position:"sticky",zIndex:"1",top:"0%",width: "100%",display:"block"}}>
        
         <NewNavbar></NewNavbar>
        <Container style={{paddingTop:"1rem"}} text>
        
        </Container>
        </div>
       }
        
       
        
        </>
       
   
     
    );
}

export default NotificationLayout;