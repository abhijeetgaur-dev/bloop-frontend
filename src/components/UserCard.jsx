import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUserFromFeed } from "../utils/feedSlice";

// eslint-disable-next-line react/prop-types
const UserCard = ({user}) =>{
  // eslint-disable-next-line react/prop-types
  const { _id ,firstName, lastName, photoUrl, about, age, gender} = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try{
      const res = axios.post(BASE_URL+"/request/send/"+status+"/"+userId, {}, {withCredentials :true});
      dispatch(removeUserFromFeed(userId));
    }catch(err){
      console.log("Something went wrong" + err);
    }
  }

  return(
    <div className="card bg-base-300 w-96 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
    <figure>
      <img
        src={photoUrl}
        alt="profile-pic" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{firstName + " "+ lastName}</h2>
      <h3 className="card-details">{age + ", "+ gender}</h3>
      <div className="pt-8">
      <h3 className="card-about">{about}</h3>
      </div>
      <p></p>
      <div className="card-actions justify-center">
        <button className="btn btn-primary" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
        <button className="btn btn-secondary" 
        onClick={() => handleSendRequest("interested", _id)}>Interested</button>
      </div>
    </div>
    </div>
  )
}

export default UserCard;

