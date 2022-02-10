import React from 'react'
import {Headermessage,Footermessage} from '../Components/Common/WelcomeMessage'
import {Form,Message,Button,Segment} from 'semantic-ui-react'
import { useState,useEffect} from 'react'
import axios from 'axios'

import catcherror from '../utils/catcherror'

import { useHistory } from 'react-router'
import { Container } from 'semantic-ui-react'
import Navbar from '../Components/Layout/Navbar'
import { Link } from 'react-router-dom'

const Login  =()=>  {
    
    let [user, setuser] = useState({
        email:"",
        password:""
    })

    const history=useHistory();
    const [formloading, setformloading] = useState(false);
    const [errormsg, seterrormsg] = useState(null);
    const {email,password}=user;
    const [showpassword, setshowpassword] = useState(false);
    const [submitDisable, setsubmitDisable] = useState(true);
    const handlechange=(e)=>{
        
        const {name,value}=e.target;
      
      setuser((prev)=>({...prev,[name]:value}))
    }
 
    useEffect(() => {
       const isUser=Object.values({email,password}).every((item)=>item!=="");
       if(!isUser){
          setsubmitDisable(true);
       }else{
           setsubmitDisable(false);
       }
       // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [user])

     const submithandler=async()=>{
        const imUser=Object.values({email,password}).every((item)=>item!=="");
        if(imUser){
            setformloading(true);
           try{
            const config = {
               
                headers: {   
                    "Content-Type": "application/json",
                           
                 }
              };
            var res=await axios.post('https://memogramapp.herokuapp.com/api/login',{user},config);

                    // if(res){
                    //     console.log(res.data);
                    // }

            if(res.data==="The User is not registered"){
                seterrormsg("The user is not registered");
                setformloading(false); 
            }else if(res.data==="password does'nt match"){
                setformloading(false);
               seterrormsg(res.data)
                
            }else{
                localStorage.setItem('token',JSON.stringify(res.data.token));
               
               setuser({
                   email:res.data.user.email,
                   password:res.data.user.password
               });
                localStorage.setItem('user',JSON.stringify(res.data.user));
                
               
                if(localStorage.getItem('user') && localStorage.getItem('token')){
                    setformloading(false); 
                    // console.log(JSON.parse(localStorage.getItem('token')));

                    if(!submitDisable){
                        history.push('/home');
                    }
                 
                }
                
            }
          
           }catch(e){
            //    console.log(e);
            const errormsg=catcherror(e);
            seterrormsg(errormsg);
            // console.log(errormsg);
            setformloading(false); 
           }
           
        }else{
            seterrormsg("Please fill all the fields to login");
        }
    }

    

    useEffect(() => {
        
       document.title="Welocome To Memogram";

       if(localStorage.getItem('token')!==null && localStorage.getItem('user')!==null){
           setuser(JSON.parse(localStorage.getItem('user')));
        //    console.log(JSON.parse(localStorage.getItem('token')));
           history.push('/home');
        
       }
      
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Container>
        <div>
        <div style={{position:"sticky",zIndex:"1",top:"0%",width: "100%",display:"block"}}>
      
            
               <Navbar></Navbar>
            
         
           </div>
             <Headermessage></Headermessage>
             <Form loading={formloading} error={errormsg!==null} 
               onSubmit={handlechange} 
               >
                   {errormsg!==null &&
                   <Message error header="OOPS!" content={errormsg}
                   onDismiss={()=>seterrormsg(null)}
                   ></Message> }
                   
                   <Segment>
                 
                        <Form.Input label="Email"
                       name="email"
                       value={email}
                       placeholder="Enter your email"
                       onChange={handlechange}
                       fluid
                       icon="envelope"
                       type="email"
                       iconPosition="left"
                       required
                       ></Form.Input>
                       <Form.Input label="Password"
                       name="password"
                       value={password}
                       placeholder="Enter the password"
                       onChange={handlechange}
                       fluid
                       icon={{
                           name:"eye",
                           circular:true,
                           link:true,
                           onClick:()=>setshowpassword(!showpassword)
                       }}
                       iconPosition="left"
                       type={showpassword?"text":"password"}
                       required
                       ></Form.Input>
                       <Form.Field>
                           <Link to={`/forgot/password`}>Forgot Password?</Link> 
                       </Form.Field>
                        <Button type="submit" color="blue" content="Login" 
                       disabled={submitDisable } onClick={()=>submithandler()}></Button>
                   </Segment>
             </Form>
             
            <Footermessage></Footermessage>
        </div>
        </Container>
    )
}



export default Login
