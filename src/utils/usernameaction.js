
import axios from "axios";

export const checkusername=async (username,userstatemanage)=>{
      
    //  console.log(username);

    try{
        
        const res=await axios.get(`https://memogramapp.herokuapp.com/api/signup/${username}`);
        if(res.data==="Available"){
            // console.log(res.data);
           userstatemanage(res.data)
        }else if(res.data==='Invalid'){
            // console.log(res.data);

        }else if(res.data==='Not Available'){
            userstatemanage(res.data)
        }
    }catch(e){
        // console.log(e)
        userstatemanage(e);
    }
   
}

export async function handlesubmit(username,currentpassword,newpassword,passwordmanage){

   let user=JSON.parse(localStorage.getItem('user'))
    const Axios = axios.create({
     
        headers: {   "Content-Type": "application/json",Authorization:localStorage.getItem('token')}
        });
        try{
            console.log("update password function")
            const res=await Axios.post(`https://memogramapp.herokuapp.com/api/profile/update/password`,
            {username:username,
            currentpassword:currentpassword,
            newpassword:newpassword,userid:user._id})

            // if(res){
            //     // console.log(res);
            //     let {data}=res
            //     // console.log(data);
            // }
        
            if(res && res.data==="password updated"){
                //  console.log(res.data);      
                 passwordmanage(res.data) 
            }
            if (res && res.data==="The password does'nt match"){
                // console.log(res.data);
                passwordmanage(res.data) 
            }
        }catch(e){
            passwordmanage(e)
        }
    


   }