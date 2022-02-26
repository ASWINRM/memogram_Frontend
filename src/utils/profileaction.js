
import axios from "axios";


export const Profileupdate=async(user,seterrormsg,profilepicurl)=>{

    try{
        let userId=JSON.parse(localStorage.getItem('user'))
        console.log(user);
        console.log(profilepicurl)
        const Axios = axios.create({
                   
            headers: {   "Content-Type": "application/json",Authorization:localStorage.getItem('token')}
          });
    
        const res=await Axios.post(`https://memogramapp.herokuapp.com/api/profile/update`,{user,profilepicurl,userid:userId._id});
    
        if(res){
            // console.log(res.data);
            if(res.data==='updated'){
                // console.log('updated')
                return "updated"
            }else{
                seterrormsg("something wrong");
            }
        }
    }catch(e){
        // console.log(e);
        seterrormsg(e)
    }

}