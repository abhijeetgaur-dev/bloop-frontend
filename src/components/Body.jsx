import { Outlet, useNavigate } from "react-router-dom"
import axios from "axios"
import NavBar from "./NavBar"
import Footer from "./Footer"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addUser} from "../utils/userSlice"
import { useEffect } from "react"

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.log("Something went wrong " + err);
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, [userData]);

  return (
    <div className="flex flex-col min-h-screen"> {/* Full height */}
      <NavBar />
      <div className="flex-grow"> {/* Pushes footer down */}
        <Outlet/>
      </div>
      <Footer />
    </div>
  );
};

export default Body;
