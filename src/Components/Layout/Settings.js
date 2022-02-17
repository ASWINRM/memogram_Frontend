import React, {useState,useEffect} from 'react';
import { Button,  Form } from 'semantic-ui-react'
import {checkusername,handlesubmit} from '../../utils/usernameaction'
import { Message,Input,Icon } from 'semantic-ui-react'


function Settings() {
    
    const regex=/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/; 

    const [username,setusername]=useState("");
    const [usernameAvailable,setusernameAvailable]=useState(false);
    const [usernameloading,setusernameloading]=useState(false);
    const [loading,setloading]=useState(false);
    const [errormsg,seterrormsg]=useState();
    const [userpasswords,setuserpasswords]=useState({
        currentpassword:"",
        newpassword:""
    })

    const [update ,setupdate]=useState(false);

    const [typed,settyped]=useState({
       
        field:false
    })

    const {currentpassword,newpassword}=userpasswords;

    const {field2}=typed;

    useEffect(()=>{

        (async()=>{
            username===""?setusernameAvailable(false):await usernamechecking(username)
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[username])

   async function usernamechecking(username){
        setusernameloading(true);
     
        await checkusername(username,userstatemanage);
     
     }

     function userstatemanage(data){
        if(data==="Available"){
         setusernameAvailable(true);
         setusernameloading(false);
         seterrormsg(null);
         
         }else{
           setusernameAvailable(false);
           setusernameloading(false);
           seterrormsg(data);
         }
   }

   function passwordmanage(data){
       if(data==="password updated"){
            setloading(false);
            setupdate(true);
       }else{
           setloading(false);
           seterrormsg(data);
       }
   }

  
   function handlechange(e){

    const {name,value}=e.target;
    // console.log(name)
    if(name==='currentpassword'){
        
   
        setuserpasswords(prev=>({...prev,currentpassword:value}))
    }else if(name==='newpassword'){
       
        setuserpasswords(prev=>({...prev,newpassword:value}))
    }

   }
  

    return (
        <div>
            {
                update &&  <Message info>
                <Message.Header>The update was done successfully</Message.Header>
                <p>please check through login</p>
              </Message>
            }
            {
              errormsg && <Message negative>
              <Message.Header>OOPS!</Message.Header>
              <p>{errormsg}</p>
            </Message>
            }

          <Form
            onSubmit={async e=>{
                setloading(true);

                if(currentpassword && newpassword){
                    await handlesubmit(username,currentpassword,newpassword,passwordmanage)
                 }
            }}
          >
              
              <Form.Field label="Username"
                    control={Input}
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
                      
                       ></Form.Field>
              

                  <Form.Field
                  control={Input}
                    fluid
                    icon={{
                      name: "eye",
                      circular: true,
                      link: true,
                      onClick: () => settyped(prev => ({ ...prev, field2: !field2 }))
                    }}
                    type={field2 ? "text" : "password"}
                    iconPosition="left"
                    label="Current Password"
                    placeholder="Enter Current Password"
                    name="currentpassword"
                    onChange={handlechange}
                    value={currentpassword}
                   

                  >

                  </Form.Field>

                  
                  <Form.Field
                   control={Input}
                    fluid
                    icon={{
                      name: "eye",
                      circular: true,
                      link: true,
                      onClick: () => settyped(prev => ({ ...prev, field2: !field2 }))
                    }}
                    type={field2 ? "text" : "password"}
                    iconPosition="left"
                    label="New Password"
                    placeholder="Enter New Password"
                    name="newpassword"
                    onChange={handlechange}
                    value={newpassword}
      

                  >

                  </Form.Field>
                   
             
            
                  <Button type='submit' loading={loading} primary ><Icon name='pencil square'></Icon>Submit</Button>
         </Form>

            
        </div>
    );
}

export default Settings;