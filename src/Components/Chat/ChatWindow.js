import React ,{memo}from 'react';

import Banner from './Banner';
import MessageInputField from './MessageInputField';
import Message from './Message'
import { Dimmer, Loader } from 'semantic-ui-react'
import {  Grid} from "semantic-ui-react";
function ChatWindow({bannerdata,messages,user,divRef,sendmsg,querymsgwith}) {

    console.log(querymsgwith)
    console.log(messages)
    console.log(user)
    console.log(bannerdata)

    return (
        <>
        <div>
            <>
            <Grid>
        <Grid.Column width={12}>
                {(querymsgwith && bannerdata && user)? (
                  <>
                    <div
                      style={{
                        overflow: "auto",
                        overflowX: "hidden",
                        overflowY: "hidden",
                        maxHeight: "25rem",
                        height: "25rem",
                        
                        minWidth:"20rem",
                        backgroundColor: "whitesmoke",
                        position:'relative'
                      }}
                    >
                      <div style={{ position: "sticky", top: "0" }}>
                        <Banner bannerData={bannerdata} />
                      </div>

                      {(messages&&messages.length) > 0 &&
                        messages.map((message, i) => (
                          <Message
                            divRef={divRef}
                            key={i}
                            bannerProfilePic={bannerdata.profilepicurl}
                            message={message}
                            user={user}
                           
                          />
                        ))}
                    </div>

                    <MessageInputField sendmsg={sendmsg} />
                  </>
                ): <Dimmer active inverted>
                <Loader ></Loader>
                 </Dimmer>}
              </Grid.Column>
            </Grid>
          </>
        ) 
        </div>
        </>
    );
}

export default memo(ChatWindow);