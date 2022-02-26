import React,{useState,useCallback,useEffect} from 'react';
import { Button,  Divider,  Form,Message,Header,Icon } from 'semantic-ui-react'
import ImageDropDiv from '../Common/ImageDropDiv';
import Commoninputs from '../Common/Commoninput'
import axios from 'axios';
import { Profileupdate} from '../../utils/profileaction'


function Updateprofile({profile,setactiveitem}) {
    
    // console.log(profile);
    const [media, setmedia] = useState(null);
const [mediapreview,setmediapreview]=useState(profile.user.profilepicurl);
const [errormsg,seterrormsg]=useState();
const [showsociallinks,setshowsociallinks]=useState(false);
const [user,setuser]=useState(profile);
const [highlighted,sethighlighted]=useState(false);
const [loading,setloading]=useState(false)
const [updated,setupdated]=useState(false)
let [profilepicurl, setprofilepicurl] = useState(" ");
useEffect(()=>{
    console.log(user);
},[user])

    useEffect(async() => {
        if (media) {
                console.log(media)
                 const form=new FormData();
            form.append('file',media);
  
          const config={
              headers:{
                  'Content-Type':'multipart/form-data',Authorization:  JSON.parse(localStorage.getItem('token')) 
              }
          }
  
          const res=await axios.post(`https://memogramapp.herokuapp.com/api/post/upload`,form,config);
  
          if(res){
              console.log(res.data)
              setprofilepicurl(res.data)
             
              
          }
      
            }
    },[media])

const changesocialstate=useCallback((showsociallinks)=>{
    setshowsociallinks(!showsociallinks)
},[showsociallinks])

  

const handlechange=useCallback(async (e)=>{

    try{
        let {name,value,files}=e.target
       
        


      

        if (name === 'media') {
            setmedia(files[0]);
            let file=files[0];
            console.log(files[0])
            
            setmediapreview(URL.createObjectURL(file));
          
            setmedia(files[0])
            
           
          
           
        }else{
            // console.log("updating others")
            console.log(name)
            if(name!=='Bio'){
                setuser(prev=>({...prev,[name]:value}))
            }else{
                setuser(prev=>({...prev,['bio']:value}))
            }
            
        }

       
    }catch(e){
        // console.log(e)
    }
 
},[user,mediapreview,media])




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

               
              
               const res= await Profileupdate(user,seterrormsg,profilepicurl)

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