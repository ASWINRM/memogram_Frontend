import cookie from 'js-cookie';


function LogoutUser(email){
  


localStorage.removeItem('token');
localStorage.removeItem('user');
localStorage.removeItem('postingpic')
localStorage.clear()
if(localStorage.getItem('token')===null){
  //  navigate('/login')
  console.log("logging out");
  document.location.href = '/'
}

  
}
export default LogoutUser;
