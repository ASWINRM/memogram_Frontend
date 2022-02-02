import React from 'react'
import { useLocation } from 'react-router';
import {Menu,Container} from 'semantic-ui-react'



const Navbar=  ()=> {
    const location=useLocation();

    

    return (
        <>
        <Menu fluid borderless>
                
          
               
                    
               
                <div style={{color:"#007FFF",padding:"2rem",marginLeft:"20%",textAlign:'center'}}>
                
                    <Container text >
                        <h1 style={{color:"#007FFF"}}>MEMOGRAM</h1>
                    
                    </Container>
                    
                </div>
            
        </Menu>    
        </>
    )
}

export default Navbar
