import React,{useCallback} from 'react'
import {Headermessage,Footermessage} from '../Components/Common/WelcomeMessage'
import {Form,Message,Button,Divider,Segment} from 'semantic-ui-react'
import { useState,useEffect} from 'react'
import Commoninputs from '../Components/Common/Commoninput.js'
import ImageDropDiv from '../Components/Common/ImageDropDiv'
import axios from 'axios'
import Registeruser from '../utils/registerUser'

import { useHistory } from 'react-router'
import { Container } from 'semantic-ui-react'
import Navbar from '../Components/Layout/Navbar'
const regex=/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/; 

 const Signup=()=> {
    const history=useHistory();
   const [formloading, setformloading] = useState(false);
   const [user,setuser] = useState({
    name:"",
    email:"",
    password:"",
    confirmpassword:"",
    bio:"",
    facebook:"",
    twitter:"",
    instagram:""
})
useEffect(()=>{
    setuser({
      name:"",
      email:"",
      password:"",
      confirmpassword:"",
      bio:"",
      facebook:"",
      twitter:"",
      instagram:""
    })
 },[]);

   const [errormsg, seterrormsg] = useState(null);
   const [username, setusername] = useState("");
   const [showsociallinks, setshowsociallinks] = useState(false);
   const [usernameloading, setusernameloading] = useState(false);
   const [usernameAvailable, setusernameAvailable] = useState(false);
   const [showpassword, setshowpassword] = useState(false);
   const [submitDisable, setsubmitDisable] = useState(true);
  const [media,setmedia]=useState("");
  const [mediapreview,setmediapreview]=useState("");
  const [highlighted,sethighlighted]=useState(false);

   const {name,email,password,confirmpassword,bio}=user;

   const handlechange=async (e)=>{
      
       const {name,value,files}=e.target;
       if(name==="media"){
           
         console.log("dei machan media")
         
         
         const file=files[0];
          console.log(file);
        //  console.log(URL.createObjectURL(files[0]));
          setmediapreview(URL.createObjectURL(files[0]))
          try{
           
            if(files[0]!==null){
                // console.log("I came to upload an image");
                
                const form=new FormData(); 
                form.append('file',files[0]);
                
                const config={
                    headers:{
                        "Content-Type": "multipart/form-data"
                    }
                }
               const res=await axios.post('https://memogramapp.herokuapp.com/api/post/upload',form,config);
               if(res){
                   console.log(res);
                //    console.log(res.data);
                   setuser((prev)=>({...prev,  profilepicurl:res.data}))
               }

            
             }
          }catch(e){
            //   console.log(e);
          }         
        }else{
            console.log(name,value)
            setuser((prev)=>({...prev,[name]:value}))
        }
     
   }

   useEffect(() => {
      const isUser=Object.values({name,email,password,confirmpassword,bio}).every((item)=>item!=="")
    //   console.log(isUser);
      if(!isUser){
         setsubmitDisable(true);
      }else{
          setsubmitDisable(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const checkusername=useCallback(async (username)=>{
        setusernameloading(true);
     

        try{
           
            const res=await axios.get(`https://memogramapp.herokuapp.com/api/signup/${username}`);
            if(res.data==="Available"){
                // console.log(res.data);
                setusernameAvailable(true);
                setuser((prev)=>({...prev,username}));
            } else {
                setusernameAvailable(false);
           seterrormsg("Username not Available");
            }
        }catch(e){
            setusernameAvailable(false);
           seterrormsg("Username not Available");
        }
       
        setusernameloading(false);
    },[user,username])

    useEffect(() => {
       username===""?setusernameAvailable(false):checkusername(username)
    }, [username])

  

    const handlesubmit=useCallback(async()=>{
    
        if(user.profilepicurl){
            setformloading(true);
            await Registeruser(user,seterrormsg,setformloading);
            setformloading(false);
            history.push('/home');
        }else{
            setuser((prev)=>({...prev,  profilepicurl:"https://res.cloudinary.com/memogram/image/upload/v1642075170/memogram/sazypiijphrrca0dxwln.jpg"}))
            setformloading(true);
            await Registeruser(user,seterrormsg,setformloading);
            setformloading(false);
            history.push('/home');
        }
        },[user])

    
     
    

//     useEffect(()=>{
//         console.log(errormsg)
//   },[errormsg])
    return (
        <Container >
        <div>
        <div style={{position:"sticky",zIndex:"1",top:"0%",width: "100%",display:"block"}}>
           <Navbar  ></Navbar>
           </div>
            <Headermessage></Headermessage>
            <Divider></Divider>
               <Form loading={formloading} error={errormsg!==null} 
               onSubmit={handlechange} 
               >
                   <Message error header="OOPS!" content={errormsg}
                   onDismiss={()=>seterrormsg(null)}
                   ></Message>
                  
                   <Segment>
                    <ImageDropDiv 
                   media={media}
                   setmedia={setmedia}
                   mediapreview={mediapreview}
                   setmediapreview={setmediapreview}
                   handlechange={handlechange}
                   highlighted={highlighted}
                   sethighlighted={sethighlighted}
                  
                   ></ImageDropDiv> 
                   <Divider></Divider>
                       <Form.Input label="name" 
                       name="name"
                       value={name}
                       placeholder="name"
                       onChange={handlechange}
                       fluid
                       icon="user"
                       type="text"
                       iconPosition="left"
                       required
                       ></Form.Input>
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
                       
                       <Form.Input label="Confirm Password"
                       name="confirmpassword"
                       value={confirmpassword}
                       placeholder="Re-Enter the password"
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
                        <Form.Input label="Username"
                       name="username"
                       value={username}
                       loading={usernameloading}
                       error={!usernameAvailable}
                       placeholder="Username "
                       onChange={(e)=>{
                           setusername(e.target.value);
                           if(regex.test(e.target.value)){
                               
                             setusernameAvailable(true);
                           }else{
                        
                               setusernameAvailable(false)
                           }
                       }}
                       fluid
                       icon={usernameAvailable?"check":"close"}
                       type="text"
                       iconPosition="left"
                       required
                       ></Form.Input>
                      
                       <Commoninputs user={user} 
                        showsociallinks={showsociallinks}
                        setshowsociallinks={setshowsociallinks}
                        handlechange={handlechange}
                            setuser={setuser}
                            
                       ></Commoninputs>
                       <Divider></Divider>
                       <Button type="submit" color="blue" content="SignUp" 
                       disabled={submitDisable || !usernameAvailable} onClick={()=>handlesubmit()}></Button>
                   </Segment>
               </Form>
               <Divider></Divider>
               <Footermessage></Footermessage>

            
        </div>
        </Container>
    )
  }


export default Signup
