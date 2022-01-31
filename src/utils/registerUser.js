import Cookies from 'js-cookie'
import axios from 'axios'
import catcherror from './catcherror'

 const Registeruser=async (user,seterror,setformloading)=>{
    
    setformloading(true);
  

   try{
    const config = {
               
        headers: {   "Content-Type": "application/json",
                   
         }
      };
       const res=await axios.post("https://memogramapp.herokuapp.com/api/signup",{user},config);
       if(res){
        // console.log(res);
      localStorage.setItem('user',JSON.stringify(user));
      localStorage.setItem('token',JSON.stringify(res.data));
        
    
       }
       
    }catch(e){
        const errormsg=catcherror(e);
        // console.log(errormsg);
        seterror(errormsg);
    }
    setformloading(false);
}

export const SetToken=(token)=>{
  
  
    try{
        Cookies.set('token',token);
        localStorage.setItem('token',JSON.stringify(token));
        // console.log(Cookies.get("token"));
        // navigate('/');
       
    }catch(e){
        // console.log(e);
    }
    
}

export default Registeruser