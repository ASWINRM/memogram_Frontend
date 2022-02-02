// import React,{useEffect} from "react";
import React from "react";
import { Segment, Grid, Image } from "semantic-ui-react";

function Banner({ bannerData }) {
  const { name, profilepicurl } = bannerData;

//   useEffect(()=>{
//    console.log(name, profilepicurl)
//   },[name,profilepicurl])

  return (
    <Segment color="teal" attached="top">
      <Grid>
        <Grid.Column floated="left" width={14}>
          <h4>
            <Image avatar src={profilepicurl} />
            {name}
          </h4>
        </Grid.Column>
      </Grid>
    </Segment>
  );
}

export default Banner;