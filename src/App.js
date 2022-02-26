
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './screen/login';
import Signup from './screen/signup'
import Layout from './Components/Layout/Layout';
import {  Sticky } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

import ProfileLayout from './Components/Layout/ProfileLayout'
import ForgotPage from './Components/Layout/ForgotPage';
import ResetPage from './Components/Layout/ResetPage'
import NotificationLayout from './Components/Layout/NotificationLayout';
import PostPage from './Components/Post/PostPage'
import Chatlayout from './Components/Chat/Chatlayout';


import Searchbar from './Components/Layout/Searchbar';
function App() {
  return (
    <Router>
      <div style={{position:Sticky,zIndex:"1"}}>
     
           </div>
               <div className="App"> 
         <main>
           
          
         <Switch>
       <Route exact  path='/home'  component={Layout}></Route>
       
       <Route exact  path='/signup'  component={Signup}></Route>
       <Route exact   path='/'      component={Login}></Route>
       <Route exact   path='/search'      component={Searchbar}></Route>
       <Route exact   path='/:username' component={ProfileLayout}></Route>
       <Route exact path='/resetpassword/:token' component={ResetPage}></Route>
       <Route exact  path='/forgot/password' component={ForgotPage}></Route>
  
       <Route exact path='/post/:postid' component={PostPage}></Route>
       
      
      
       </Switch>
       
         </main>
    </div>
    </Router> 
  );
}

export default App;
