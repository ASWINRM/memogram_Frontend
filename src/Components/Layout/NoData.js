import { Message ,Button} from "semantic-ui-react";
import { Link } from 'react-router-dom';
export const NoPosts = () => (
   <div style={{"marginTop":"5%"}}>
     <Message
      info
      icon="meh"
      header="Hey!"
      content="No Posts. Make sure you have followed someone."
    />
   </div>
    
);

export const NoProfilePosts = () => (
  <>
    <Message info icon="meh" header="Sorry" content="User has not posted anything yet!" />
  <Link to='/home' style={{textDecoration:"none"}}>
  <Button icon="long arrow alternate left" content="Go Back"  />
  </Link>
   
  </>
);

export const NoFollowData = ( {followersComponent, followingComponent }) => {
 console.log(followersComponent, followingComponent)
  return (
    <>
    {followersComponent && (
      <Message icon="user outline" info content={`User does not have followers`} />
    )}

    {followingComponent && (
      <Message icon="user outline" info content={`User does not follow any users`} />
    )}
  </>
  )
 
};

export const NoNotifications = () => (
  <Message content="No Notifications" icon="smile" info />
);



export const NoPostFound = () => (
  <Message info icon="meh" header="Hey!" content="No Post Found." />
);

export const NoMessages = () => (
  <Message
    info
    icon="telegram plane"
    header="Sorry"
    content="You have not messaged anyone yet.Search above to message someone!"
  />
);