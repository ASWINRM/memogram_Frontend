

const catcherror=(error)=> {
    let errormsg;
  
    if(error.response){
        errormsg=error.response.data;
        
    }
    else if(error.request){
        errormsg=error.request;
       
  
    }else{
        errormsg=error.message;
        
    }
  
    return errormsg;
  }
  export default catcherror