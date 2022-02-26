
import React,{createRef} from 'react'
import NewNavbar from './NewNavbar'
import {Container, Grid,Sticky,Ref,Visibility,Segment, Button,Icon} from 'semantic-ui-react'

import Profile from '../../screen/profile';
import { createMedia } from "@artsy/fresnel";
import { useHistory } from 'react-router';
const AppMedia = createMedia({
    breakpoints: { zero: 0, mobile: 549, tablet: 850, computer: 1080 }
  });
  
  const mediaStyles = AppMedia.createMediaStyle();
  const { Media, MediaContextProvider } = AppMedia;
function ProfileLayout(props) {
  let history=useHistory();
    const ContextRef=createRef();
   const user=JSON.parse(localStorage.getItem('user'));

   let username=window.location.pathname.split("/")[1];
//    if(user){
//        console.log("user :"+user);
//    }
    return (
      
        <>
        
        <style>{mediaStyles}</style>
        {user?
        
        <MediaContextProvider>

          
        <div>
            
            <div style={{position:"sticky",zIndex:"1",top:"0%",width: "100%",display:"block"}}>
           <NewNavbar  ></NewNavbar>
           </div>
           <Button icon onClick={()=>{ 
            history.push('/home')}}>
               <Icon name='arrow left' /> back
                   </Button>
           <Media greaterThanOrEqual="computer">
           <Ref innerRef={ContextRef}>
           
          
               <Grid columns='3'>
              
                   <Grid.Column floated="left"  mobile={0} tablet={8} computer={2}>
                       
                      
                   </Grid.Column>
                   <Grid.Column  mobile={16} tablet={4} computer={11}>
                      <Visibility context={ContextRef} ><div style={{marginTop:"20px"}}></div><Profile username={username}></Profile></Visibility>
                   </Grid.Column>
                   <Grid.Column floated="left"  mobile={0} tablet={2} computer={3}>
                    <Sticky context={ContextRef} active={true} offset={85}>
                     
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
                          
                        </Grid.Column>

                        <Grid.Column width={15}>
                           <Visibility context={ContextRef} ><div style={{marginTop:"20px"}}></div><Profile username={username}></Profile></Visibility>
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
                    
                        </Grid.Column>

                        <Grid.Column width={14}>
                       <Visibility context={ContextRef} ><div style={{marginTop:"20px"}}></div><Profile username={username}></Profile></Visibility>
                        </Grid.Column>
                      </>
                   
                  </Grid>
                  </Ref>
              </Media>

              <Media between={["zero", "mobile"]}>
              <Ref innerRef={ContextRef}>
                             <Grid>
             
                  <Grid.Column>  <Visibility context={ContextRef} ><div style={{marginTop:"20px"}}></div><Profile username={username}></Profile></Visibility></Grid.Column>
                </Grid>
                </Ref>
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
       
        
    );
}

export default ProfileLayout;