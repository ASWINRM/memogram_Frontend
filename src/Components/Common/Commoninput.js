import React,{useCallback} from 'react'
import {Form,Message,Button,Divider} from 'semantic-ui-react'

const Commoninputs  =({user,handlechange,showsociallinks,
  changesocialstate,setuser})=> {
  let {Bio,facebook,twitter,instagram}=user

  // useEffect(()=>{
  //   console.log(user)
  // },[user])
//  console.log(Bio,facebook,twitter,instagram)
  const handleBioChange=useCallback(async(e)=>{
    
    const {name,value}=e.target;   
    
   setuser((prev)=>({...prev,[name]: value}))
  
},[setuser])
    return (
        <>
          {/* <Form.Field
          control={TextArea}
          name="Bio"
          label="Bio"
          name="Bio"
          value={user.bio}
          placeholder="Bio data"
          onChange={handleBioChange}
          required
          ></Form.Field>   */}
          <div style={{marginBottom:"3%"}}>
            <label>Bio</label>
            <textarea name="Bio"  onChange={handleBioChange}   className="myText"
            placeholder="Bio Data" rows="5" cols="50"required value={Bio}></textarea>
          </div>
          <Button content="Add Social Links"
          icon="at"
          type="button"
          onClick={()=>changesocialstate(showsociallinks)}
          color="red"
          ></Button>
          {showsociallinks &&
          <>
           <Divider></Divider>
          <Form.Input label="Facebook"
          name="facebook"
          value={facebook}
          onChange={handlechange}
          icon="facebook"
          iconPosition="left"
          ></Form.Input>
          <Form.Input label="Twitter"
          name="twitter"
          value={twitter}
          onChange={handlechange}
          icon="twitter"
          iconPosition="left"
          ></Form.Input>
          <Form.Input label="Instagram"
          name="instagram"
          value={instagram}
          onChange={handlechange}
          icon="instagram"
          iconPosition="left"
          ></Form.Input>
          <Message icon="attention" info size="small"
           header="Social links are optional" ></Message>
          </>
         
          }
        </>
    )
}

export default Commoninputs
