import React, { useState } from "react";
import { List, Popup, Image } from "semantic-ui-react";
import axios from "axios";
import catchErrors from "../../utils/catcherror";
import { useHistory } from "react-router-dom";
import {LikesPlaceHolder} from '../Layout/PlaceHolderGroup'
const LikesList=({ postId, trigger })=> {
  const [likesList, setLikesList] = useState([]);
  const [loading, setLoading] = useState(false);

  const history=useHistory();
  const getLikesList = async () => {
    setLoading(true);
    try {
       

      const res = await axios.get(`https://memogramapp.herokuapp.com/api/post/like/${postId}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem('token') }
      });
      setLikesList(res.data);
    } catch (error) {
      alert(catchErrors(error));
    }
    setLoading(false);
  };

  return (
    <Popup
      on="click"
      onClose={() => setLikesList([])}
      onOpen={getLikesList}
      popperDependencies={[likesList]}
      trigger={trigger}
      wide>
      {loading ? (
        <LikesPlaceHolder />
      ) : (
        <>
          {likesList.length > 0 && (
            <div
              style={{
                overflow: "auto",
                maxHeight: "15rem",
                height: "15rem",
                minWidth: "210px"
              }}>
              <List selection size="large">
                {likesList.map(like => (
                  <List.Item key={like._id}>
                    <Image avatar src={like.user.profilepicurl} />

                    <List.Content>
                      <List.Header
                        onClick={() => history.push(`/${like.user.username}`)}
                        as="a"
                        content={like.user.name}
                      />
                    </List.Content>
                  </List.Item>
                ))}
              </List>
            </div>
          )}
        </>
      )}
    </Popup>
  );
}

export default LikesList;
