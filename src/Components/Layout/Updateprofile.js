import React,{useState} from 'react';
import { Button,  Divider,  Form,Message,Header,Icon } from 'semantic-ui-react'
import ImageDropDiv from '../Common/ImageDropDiv';
import Commoninputs from '../Common/Commoninput'
import axios from 'axios';
import { Profileupdate} from '../../utils/profileaction'


function Updateprofile({profile,setactiveitem}) {
    
    console.log(profile);
const [media,setmedia]=useState(null);
const [mediapreview,setmediapreview]=useState(profile.user.profilepicurl);
const [errormsg,seterrormsg]=useState();
const [showsociallinks,setshowsociallinks]=useState(false);
const [user,setuser]=useState(profile);
const [highlighted,sethighlighted]=useState(false);
const [loading,setloading]=useState(false)
const [updated,setupdated]=useState(false)

// useEffect(()=>{
//     console.log(user);
// },[user])

const changesocialstate=(showsociallinks)=>{
    setshowsociallinks(!showsociallinks)
}

const handlechange=async (e)=>{

    try{
        let {name,value,files}=e.target
       
        


      

        if(name==='media'){
            let file=files[0];
            // console.log("updating media")
            setmedia(file);
            setmediapreview(URL.createObjectURL(file));
      
            // if(file!==null){
            //     const form=new FormData();
            //     form.append('file',file);
      
            //   const config={
            //       headers:{
            //           'Content-Type':'multipart/form-data',Authorization:  JSON.parse(localStorage.getItem('token')) 
            //       }
            //   }
      
            //   const res=await axios.post(`http://localhost:5000/api/profile/update`,form,config,user);
      
            //   if(res){
            //       console.log(res.data)
                  
            //   }
            // }
      
           
        }else{
            // console.log("updating others")
            if(name!=='bio'){
                setuser(prev=>({...prev,[name]:value}))
            }else{
                setuser(prev=>({...prev,['bio']:value}))
            }
            
        }

       
    }catch(e){
        // console.log(e)
    }
 
}


const uploadimage=async ()=>{
    try{
        if(media!==null){
            // console.log(media);
            const form=new FormData();
            form.append('file',media);
  
          const config={
              headers:{
                  'Content-Type':'multipart/form-data',Authorization:  JSON.parse(localStorage.getItem('token')) 
              }
          }
  
          const res=await axios.post(`https://memogramapp.herokuapp.com/api/post/upload`,form,config);
  
          if(res){
            //   console.log(res.data)
              setmediapreview(res.data)
              setuser(prev=>({...prev,profilepicurl:res.data}))
              
          }
        }

    }catch(e){
        // console.log(e)
        seterrormsg(e)
    }
      
      
}

    return (
        <div>{
            updated && <Message info>
            <Message.Header>
                <Icon name='check circle outline'></Icon>
                The Profile Was updated successfully</Message.Header>
               <p>check through your profile!</p>
           </Message>
            }
             
            <Form
            loading={loading}
            onSubmit={async(e)=>{
                e.preventDefault()
                 setloading(true)

                if(media!==null){
                    await uploadimage();
                }

               const res= await Profileupdate(user,seterrormsg)

               if(res ){
                   setloading(false);
                   setupdated(true);
                
               }



            }}
            >
            <Message error header="OOPS!" content={errormsg}
                   onDismiss={()=>seterrormsg(null)}
                   ></Message>
                   <Header>Profile Pic</Header>
                <ImageDropDiv
                setmedia={setmedia}
                media={media}
                setmediapreview={setmediapreview}
                mediapreview={mediapreview}
                sethighlighted={sethighlighted}
                highlighted={highlighted}
                handlechange={handlechange}
                ></ImageDropDiv>
                <Commoninputs
                user={user}
                handlechange={handlechange}
                showsociallinks={showsociallinks}
                changesocialstate={changesocialstate}
                setuser={setuser}
                ></Commoninputs>
                <Divider></Divider>
                <Button
                 color="blue"
                 icon="pencil alternate"
                 disabled={user.bio === "" || loading}
                 content="Submit"
                 type="submit"
        
                ></Button>
            </Form>
            
        </div>
    );
}

export default Updateprofile;