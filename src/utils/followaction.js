import axios from 'axios';

// export const followuser=async(_id,setisfollowing)=>{
   
//     try{
//         const logintoken=JSON.parse(localStorage.getItem('token'));
//         const Axios = axios.create({
               
//             headers: {   "Content-Type": "application/json",Authorization: logintoken}
//           });
//         const res=await Axios.post("http://localhost:5000/api/followtask/follow",{fu_id:_id})

//         if(res){
//             let data=res.data;
//             if(data==="updated"){
//                 console.log(res.data);
//                 setisfollowing(true);
              
//             }
            
//         }else{
//             console.log(res.data);
//         }
//     }catch(e){
//           console.log(e);
//     }

// }

//unfollow
export async function userunfollow(id,unfollowuser){
    console.log("unfollow function")

    try{

    
    const logintoken=JSON.parse(localStorage.getItem('token'));
    const Axios = axios.create({
           
        headers: {   "Content-Type": "application/json",Authorization: logintoken}
      });
    const res=await Axios.post("https://memogramapp.herokuapp.com/api/followtask/unfollow",{unfollowuser_id:id})

    if(res){
        // console.log(res);

        let data=res.data;
        // console.log(res);
        if(data==="unfollowed succesfully"){
            // console.log(res.data);
          unfollowuser(id);
          
        }else{
        // console.log(res.data);
        }
    }
}catch(e){
    //   console.log(e);
}
    
 }

//followuser
export async function userfollow(id,followuser){
    // console.log("follow function")
              
    try{
        const logintoken=JSON.parse(localStorage.getItem('token'));
        const Axios = axios.create({
               
            headers: {   "Content-Type": "application/json",Authorization: logintoken}
          });
        const res=await Axios.post("https://memogramapp.herokuapp.com/api/followtask/follow",{fu_id:id})

        if(res){
            // console.log(res);
            let data=res.data;
            if(data==="updated"){
                // console.log(res.data);
                followuser(id);
              
            }
            
        }else{
            // console.log(res.data);
        }
    }catch(e){
        //   console.log(e);
    }
            
       

       
 }


// export const unfollowuser=async(_id,setisfollowing)=>{
    
//     try{
//         console.log("unfollow")
//         const logintoken=JSON.parse(localStorage.getItem('token'));
//         const Axios = axios.create({
               
//             headers: {   "Content-Type": "application/json",Authorization: logintoken}
//           });
//         const res=await Axios.post("http://localhost:5000/api/followtask/unfollow",{unfollowuser_id:_id})

//         if(res){
//             let data=res.data;
//             console.log(res);
//             if(data==="unfollowed succesfully"){
//                 console.log(res.data);
//                 setisfollowing(false);
              
//             }else{
//             console.log(res.data);
//             }
//         }
//     }catch(e){
//           console.log(e);
//     }
// }


export const followings=async()=>{
    try{
        const logintoken=JSON.parse(localStorage.getItem('token'));
        const Axios = axios.create({
               
            headers: {   "Content-Type": "application/json",Authorization: logintoken}
          });
          const res=await Axios.post("https://memogramapp.herokuapp.com/api/followtask/followings")

          if(res){
              console.log(res.data);
              return res.data;
          }
    }catch(e){
        // console.log(e);
    }
}