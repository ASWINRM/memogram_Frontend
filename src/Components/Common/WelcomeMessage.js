import React from 'react'
import {Icon,Message,Divider} from 'semantic-ui-react'


import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
export const Headermessage =()=> {
   
    
    // eslint-disable-next-line no-restricted-globals
    const location=useLocation();
    const signuproute=location.pathname==="/signup"

    return (
        <div>
            <Message attached
            color="blue"
            header={signuproute?"Get Started":"Welcome Back Buddy"}
            icon={signuproute?"settings":"privacy"}
            content={signuproute?"Create new Account":"Login with Email and Password"}
            ></Message>
        </div>
    )
}

export  const Footermessage=()=>{
    
    // eslint-disable-next-line no-restricted-globals
    const signuproute=location.pathname==="/"
    return (
        <div>
          {
              signuproute?
              (
              <>
               <Message attached="bottom" warning >
               
                Existing User?{" "}<Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>
            </Message>
                <Divider></Divider>

              </>
             
            
            ):(
                <>
                <Message attached="bottom" info >
                <Icon name="lock"></Icon>
                <Link to="/reset">Forgot Password</Link>
               </Message>
               <Message attached="bottom" warning>
                <Icon name="help"></Icon>
                New User?{" "}
               <Link to="/">Sign up</Link>
              </Message>
              <Divider></Divider>

            </>
            
            )

          }
            
        </div>
    )
}

