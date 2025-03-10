import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addRequests } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store)=> store.requests.requests);
  // console.log(requests);
  // console.log(requests.requests[0].fromUserId.firstName)

  const fetchRequests = async () =>{
    try{
      const res = await axios.get(BASE_URL+"/user/requests/recieved/" , {withCredentials: true});

      dispatch(addRequests(res.data.data))

    }catch(err){
      console.log("Something Went Wrong" + err)
    }
   
  }

  useEffect(()=>{
    fetchRequests();
  },[])

  if(!requests) return;

  if(requests.length === 0) return <h1>No connection found!</h1>

return (
  <div>
    <div className="heading flex items-center justify-center">
      <h1 className="text-3xl pt-5 ">Connection Requests</h1>
    </div>

    <div className="max-w-[800px] mx-auto">
      {requests.map((user) => {
      const { firstName, lastName, about, age, gender, photoUrl, skills } = user.fromUserId;
      return (
      <div key={`${firstName}-${lastName}`} className="connectionCard p-4 bg-base-300 w-full my-7 rounded-lg shadow-md flex items-center gap-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] pl-4">
      <img src={photoUrl} alt={`${firstName} ${lastName}`} className="w-16 h-16 rounded-full object-cover ml-8" />
      <div className="pl-14">
        <h2 className="text-lg font-semibold">{firstName} {lastName}</h2>
        <p className="text-sm text-gray-600">{about}</p>
        <p className="text-sm text-gray-500">Age: {age}, Gender: {gender}</p>
      </div>
      <div className="ml-64 ">
      <button className="btn btn-success mx-2">Accept</button>
      <button className="btn btn-error mx-2">Reject</button>
      </div>
    </div>
    );
    })}
    </div>

  </div>
  )}


export default Requests