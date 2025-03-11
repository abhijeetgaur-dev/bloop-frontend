import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {removeUser ,addUser} from "../utils/userSlice" 
import { useEffect } from "react";


const NavBar = () => {

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const requestCount = useSelector((state) => state.requests.requestCount);


  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");             // Redirect to login
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  // const fetchData = async () =>{
  //   try{
  //     const res= await axios.get(BASE_URL+"/profile/view", {withCredentials: true} )
  //     dispatch(addUser(res?.data));
  //   }catch(err){
  //     console.log("Error : "+err);
  //   }
  // }

  // useEffect(()=>{
  //   fetchData();
  // },[])
  
  return(
        <div className="navbar bg-base-300 px-5 shadow-lg">
          <div className="flex-1">
            <Link to="/" className="btn btn-ghost text-xl">bloop</Link>
          </div>
          {user && 
            (<div className="flex-none gap-2">
              <div className="form-control">
                <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
              </div>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={user.photoUrl} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                  <li>
                    <Link to="/profile" className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/connections" className="justify-between">
                      Connections
                    </Link>
                  </li>
                  <li>
                    <Link to="/requests" className="justify-between">
                    Requests 
                      {
                        // (requestCount)? <span className="badge">{requestCount}</span> :  <span></span>
                      }
                    </Link>
                  </li>
                  <li>
                    <Link to="/feed" className="justify-between">
                      Feed
                    </Link>
                  </li>
                  <li><a onClick={handleLogout}>Logout</a></li>
                </ul>
              </div>
            </div>)
          }
      </div>
  )
}

export default NavBar;