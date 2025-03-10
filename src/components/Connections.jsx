import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";


const Connections =  () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections)
  console.log(connections)
    
    const fetchConnections = async  () =>{
      try{
        const res = await axios.get(BASE_URL+"/user/connections/" ,{withCredentials :true}); 

        dispatch(addConnections(res.data.data))
        }catch(err){
      console.log("Something Went Wrong "+ err); 
      }
    }
  
    useEffect(() =>{
      fetchConnections();
    }, [])

    if(!connections) return;

    if(connections.length === 0) return <h1>No connection found!</h1>

  return (
    <div>
      <div className="heading flex items-center justify-center"><h1 className="text-3xl pt-5 ">Connections</h1></div>
      <div className="max-w-[800px] mx-auto">
  {connections.map((user) => {
    const { firstName, lastName, about, age, gender, photoUrl } = user;
    return (
      <div key={`${firstName}-${lastName}`} className="connectionCard p-4 bg-base-300 w-full my-7 rounded-lg shadow-md flex items-center gap-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] pl-4">
        <img src={photoUrl} alt={`${firstName} ${lastName}`} className="w-16 h-16 rounded-full object-cover ml-8" />
        <div className="pl-14">
          <h2 className="text-lg font-semibold">{firstName} {lastName}</h2>
          <p className="text-sm text-gray-600">{about}</p>
          <p className="text-sm text-gray-500">Age: {age}, Gender: {gender}</p>
        </div>
      </div>
    );
  })}
</div>
    </div>
  )
}

export default Connections