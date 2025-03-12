import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () =>{

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);

  useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async () =>{
    try{
      const res = await axios.post(BASE_URL+"/signup", {firstName,lastName,emailId,password},
        {withCredentials: true})
      
        dispatch(addUser(res.data.data));
        navigate("/profile")
      }catch (err) {
        console.log("Error:", err);
        if (err.response) {
          console.log("Response data:", err.response.data);
          setError(err.response.data.message || "Invalid credentials. Please try again.");
        } else if (err.request) {
          setError("No response from the server. Please try again later.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      }
    }



  const handleLogin = async () =>{
      try{
        const res = await axios.post(BASE_URL+"/login",{
          emailId,
          password
        }, {withCredentials: true,});
        

        if (res.status == 200) {
          dispatch(addUser(res.data));
          navigate("/feed");
        } else if(res.status == 401) {
          throw new Error ("Invalid Credentials")
        }
      } catch (err) {
          console.log("Error:", err);
          if (err.response) {
            console.log("Response data:", err.response.data);
            setError(err.response.data.message || "Invalid credentials. Please try again.");
          } else if (err.request) {
            setError("No response from the server. Please try again later.");
          } else {
            setError("Something went wrong. Please try again.");
          }
        }
    }

    return (
      <div className="flex justify-center">
        <div className="card bg-base-200 text-primary-content w-96 my-24">
          <div className="card-body">
          <h2 className="card-title justify-center">{ isLoginForm ? "Login" : "Sign up" }</h2>
              {!isLoginForm && <>
                <span className="label-text">First Name</span>
              <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="" value={firstName}onChange={(e) => setFirstName(e.target.value)} />
              </label>

              <span className="label-text">Last Name</span>
              <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="" value={lastName}onChange={(e) => setLastName(e.target.value)} />
              </label>
              </>}
            
              <span className="label-text">Email Id</span>
              <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="Email" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
              </label>

              <span className="label-text">Password</span>
              <label className="input input-bordered flex items-center gap-2">
                <input type="password" className="grow" placeholder="Password" value={password}onChange={(e) => setPassword(e.target.value)} />
              </label>

              <span className="text-red-500">{error}</span>

              {isLoginForm ? <button className="btn btn-outline btn-secondary" onClick={handleLogin}>Login</button> 
              : <button className="btn btn-outline btn-secondary" onClick={handleSignUp}>Sign Up</button> }
              
              <span className="text-center cursor-pointer pt-6" onClick ={() => setIsLoginForm((value) => !value)}>{isLoginForm ? "New User? Sign Up Here" : "Existing User? Login Here"}</span>
              
          </div>
      </div>
    </div>
    ) 
}

export default Login;