import React from 'react'

import {Menu,Container} from 'semantic-ui-react'



const Navbar=  (scrollToTop)=> {
 

    return (
        <>
        <Menu fluid borderless>
                
          
               
                    
               
                <div style={{color:"#007FFF",padding:"2rem",marginLeft:"20%",textAlign:'center',cursor:'pointer'}}
               onClick={()=>scrollToTop()}
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
