
import axios from "axios";


export const Profileupdate=async(user,seterrormsg)=>{

    try{

        // console.log(user);
    
        const Axios = axios.create({
                   
            headers: {   "Content-Type": "application/json",Authorization:  JSON.parse(localStorage.getItem('token'))}
          });
    
        const res=await Axios.post(`https://memogramapp.herokuapp.com/api/profile/update`,{user});
    
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