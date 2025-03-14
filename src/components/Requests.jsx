import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store)=> store.requests);

  const fetchRequests = async () =>{
    try{
      const res = await axios.get(BASE_URL+"/user/requests/recieved/" , {withCredentials: true});
      // console.log(res.data.data)
      dispatch(addRequests(res.data.data))
    }catch(err){
      console.error("Failed to fetch requests:", err);
    }
  }

  const reviewRequest = async (status, _id ) =>{
    try{
      const res= await axios.post(BASE_URL + "/request/review/"+status+"/"+_id ,{},{withCredentials: true});
      dispatch(removeRequest(_id)); 
    }catch(err){
      console.log(err);
    }

  }

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return <h1 className="flex justify-center my-10"> No Requests Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connection Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="request-wrapper flex flex-row bg-base-300 my-3 items-center max-w-[800px] m-auto p-3 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-xl"
          >
            <div className="img-container flex-shrink-0">
              <img
                alt="photo"
                className="w-24 h-24 rounded-full"
                src={photoUrl}
              />
            </div>
            <div className="content-container text-left mx-4 min-w-[400px] flex-grow">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div className="btn-container flex">
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequest("rejected",request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Requests;