import React from 'react'
import { useLocation } from 'react-router';
import {Menu,Icon,Container} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { createMedia } from "@artsy/fresnel";
const AppMedia = createMedia({
  breakpoints: { zero: 0, mobile: 549, tablet: 850, computer: 1080 }
});

const mediaStyles = AppMedia.createMediaStyle();
const { Media, MediaContextProvider } = AppMedia;

const Navbar=  ()=> {
    const location=useLocation();

    const isActive=(route)=>location.pathname===route;

    return (
        <>
        <MediaContextProvider>
        <Media greaterThanOrEqual="computer">
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
        </Media>

        <Media between={["tablet", "computer"]}>
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
        </Media>

        <Media between={["mobile", "tablet"]}>
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
        </Media>

        <Media between={["zero", "mobile"]}>
        <Menu fluid borderless>
                <div>
                <h1 style={{color:"#007FFF",padding:"2rem"}}>MEMOGRAM</h1>
                </div>
                </Menu>
        </Media>
        
        </MediaContextProvider>
       
        </>
    )
}

export default Navbar
