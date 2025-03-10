import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard"
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const EditProfile = ( ) =>{

  const user =  useSelector((store) => store.user);
  
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [showToast ,setShowToast] = useState(false);
  
  const dispatch = useDispatch();


  const saveProfile = async () => {
    setError(""); //clearing any earlier errors
    try{
      const res = await axios.patch(BASE_URL+"/profile/edit" ,{firstName, lastName, photoUrl, about, age, gender}, {withCredentials:  true});
      
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(()=>{
        setShowToast(false);
      }, 3000);

    }catch(err){
      setError(err.response.data);
      
      console.log(err);
    }
      
  }

    return (
      <div>
        <div className="flex flex-row mx-auto justify-center my-16">
        <div className="flex justify-center pr-20">
          <div className="card bg-base-200 text-primary-content w-96 ">
            <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            
            <div className="label-container">
                <div className="label">
                  <span className="label-text">First Name</span>
                </div>
                <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </label>
            </div>

            <div className="label-container">
                <div className="label">
                  <span className="label-text">Last Name</span>
                </div>
                <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </label>
            </div>

            <div className="label-container">
                <div className="label">
                  <span className="label-text">Age</span>
                </div>
                <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="" value={age} onChange={(e) => setAge(e.target.value)} />
              </label>
            </div>
    
            <div className="label-container">
                <div className="label">
                  <span className="label-text">Gender</span>
                </div>
                <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="" value={gender} onChange={(e) => setGender(e.target.value)} />
              </label>
            </div>
            
            <div className="label-container">
                <div className="label">
                  <span className="label-text">Photo URL</span>
                </div>
                <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
              </label>
            </div>
    
            <div className="label-container">
                <div className="label">
                  <span className="label-text">About</span>
                </div>
                <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="" value={about} onChange={(e) => setAbout(e.target.value)} />
              </label>
            </div>

    
            <span className="text-red-500">{error} </span>
            <button className="btn btn-outline btn-secondary" onClick= {saveProfile}>Save Changes</button>
            </div>
        </div>
        </div>
        <div className="flex items-center">
          <UserCard user = {{firstName, lastName, photoUrl, about, age, gender}}/>
        </div>
        </div>
        { showToast && 
        (<div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated succesfully</span>
          </div>
        </div>)}
      </div>
    ) 
}

export default EditProfile;