import React,{useState,useEffect,useRef} from 'react';
import { Comment, Grid ,Segment} from "semantic-ui-react";
import axios from 'axios';
import {useHistory} from 'react-router-dom'
import {NoMessages} from '../Layout/NoData'
import SideMenu from '../Layout/SideMenu'

function NoChats() {
    return (
        <div>
            <div style={{position:"sticky",zIndex:"1",top:"0%",width: "100%",display:"block"}}>
           <NewNavbar  ></NewNavbar>
           </div>
           <Ref innerRef={ContextRef}>
           
           <Grid columns='3'>
              <Grid.Column  mobile={0} tablet={8} computer={2}>
                   
                  <Sticky context={ContextRef} active={true} offset={85} >
                  
                  <SideMenu user={user} pc={true} ></SideMenu>
                    </Sticky> 
               </Grid.Column>

               <Grid.Column floated="left" mobile={16} tablet={6} computer={14}>
                 <NoMessages></NoMessages>
               </Grid.Column>
            
           </Grid>
       </Ref>
        </div>
    );
}

export default NoChats;