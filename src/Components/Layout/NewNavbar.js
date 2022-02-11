import React from 'react'
import { useLocation } from 'react-router';
import {Menu,Container} from 'semantic-ui-react'
import { useHistory } from 'react-router';


const Navbar=  ()=> {
    const location=useLocation();

    const history=useHistory();

    return (
        <>
        <Menu fluid borderless>
                
          
               
                    
               
                <div style={{color:"#007FFF",padding:"2rem",marginLeft:"20%",textAlign:'center',cursor:'pointer'}}
               
                >
                
                    <Container text >
                        <h1 style={{color:"#007FFF"}} 
                        >MEMOGRAM</h1>
                    
                    </Container>
                    
                </div>
            
        </Menu>    
        </>
    )
}

export default Navbar
