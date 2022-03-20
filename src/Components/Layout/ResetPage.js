import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from 'react-router'
import { Form, Button, Message, Segment, Divider } from "semantic-ui-react";
import axios from "axios";
import Navbar from "./Navbar";
import { Container } from 'semantic-ui-react'
function ResetPage() {
    let history=useHistory();
 
let token=window.location.pathname.split('/')[2]
// console.log(token)
  const [field1, setfield1] = useState("");
  const [field2, setfield2] = useState("");
 
  const [showpassword,setshowpassword]=useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [success, setSuccess] = useState(false);

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name);
    // console.log(value);
    setfield1(value);
  };
  
  const handleChange2 = (e) => {
    const { name, value } = e.target;
    // console.log(name);
    // console.log(value);
    setfield2(value);
  }

  useEffect(() => {
    errorMsg !== null && setTimeout(() => setErrorMsg(null), 5000);
  }, [errorMsg]);

  const resetPassword = async e => {
    e.preventDefault();
    let controller=new AbortController();
    let signal=controller.signal;
    try {
      console.log(field1);
      console.log(field2);
      setLoading(true);
      try {
        if (field1.length < 6 && field1.length < 6) {
          console.log(field1 + " " + field2)
                setLoading(false);
          return setErrorMsg("Password must be atleast 6 characters length");
        }
        if (field1 !== field2) {
                setLoading(false);
          return setErrorMsg("Passwords do not match");
        }
        console.log(token);
        console.log(field1);
        if (field1 !== "" && field1.length > 6 && field2.length > 6) {
          console.log(field1);
          await axios.post(`https://memogramapp.herokuapp.com/api/forgot/token`, {
          password:field1,
          token:token,
          signal:signal
        });
  
        setSuccess(true);
        }
        
      } catch (error) {
        setErrorMsg(error);
      }
  
      setLoading(false);
    }catch(e){
         console.log(e)
    }
   
  };

  return (
    <>
    <Container>
      <Navbar></Navbar>
      {success ? (
        <Message
          attached
          success
          size="large"
          header="Password reset successfull"
          icon="check"
          content="Login Again"
          style={{ cursor: "pointer" }}
          onClick={() => history.push("/login")}
        />
      ) : (
        <Message attached icon="settings" header="Reset Password" color="teal" />
      )}

      {!success && (
         <>
          
            <Form loading={loading} onSubmit={resetPassword} error={errorMsg !== null}>
          <Message error header="Oops!" content={errorMsg} />

          <Segment>
            <Form.Input
              fluid
              icon={{
                name:"eye",
                circular:true,
                link:true,
                onClick:()=>setshowpassword(!showpassword)
            }}
              type={showpassword?"text":"password"}
              iconPosition="left"
              label="New Password"
              placeholder="Enter new Password"
              name="field1"
              onChange={handleChange}
              value={field1}
              required
            />
            <Form.Input
              fluid
              icon={{
                name:"eye",
                circular:true,
                link:true,
                onClick:()=>setshowpassword(!showpassword)
            }}
              type={showpassword?"text":"password"}
              iconPosition="left"
              label="Confirm Password"
              placeholder="Confirm new Password"
              name="field2"
              onChange={handleChange2}
              value={field2}
              required
            />

            <Divider hidden />

            <Button
              disabled={field1 === "" || field2 === "" || loading}
              icon="configure"
              type="submit"
              color="orange"
              content="Reset"
            />
          </Segment>
        </Form>
         </>
       
      )}
      </Container>
    </>
  );
}

export default ResetPage;
