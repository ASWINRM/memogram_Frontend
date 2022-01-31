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
                <div>
                <h1 style={{color:"#007FFF",padding:"2rem"}}>MEMOGRAM</h1>
                </div>
            <Container text>
               
                    
               
                <Link to="/signup" style={{ textDecoration: 'none' ,marginLeft:"10px" }}>
                <Menu.Item header active={isActive('/signup')} style={{ marginLeft:"10px" }}>
                    <Icon size="large" name="signup"></Icon>
                    Signup
                </Menu.Item>
                </Link>
                <Link to="/" style={{ textDecoration: 'none' }}>
                <Menu.Item header active={isActive('/')} style={{ marginLeft:"10px" }}>
                    <Icon size="large" name="sign in"></Icon>
                    Login
                </Menu.Item>
                </Link>
            </Container>
        </Menu>    
        </>
    )
}

export default Navbar
