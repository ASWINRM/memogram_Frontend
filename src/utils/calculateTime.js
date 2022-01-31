import moment from 'moment';
import Moment from 'react-moment';

export const calculateTime=(createdAt)=>{

    const today=moment(Date.now());
    const postdate=moment(createdAt);
    const difference=today.diff(postdate,"hours")

    if(difference<24){
        return(
            <>
              Today <Moment format="hh:mm A">{createdAt}</Moment>
            </>
        )
    }else if(difference>24 && difference<36){
        return(
            <>
              Yesterday <Moment format="hh:mm A">{createdAt}</Moment>
            </>
        )
    }else if(difference>36){
        return(
            <>
               <Moment format=" DD:MM:YYYY hh:mm A">{createdAt}</Moment>
            </>
        )
    }
}

export default calculateTime;