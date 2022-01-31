import React from 'react'
import { useLocation } from 'react-router';
import {Menu,Icon,Container} from 'semantic-ui-react'
import { Link } from 'react-router-dom';


const Navbar=  ()=> {
    const location=useLocation();

    const isActive=(route)=>location.pathname===route;

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
