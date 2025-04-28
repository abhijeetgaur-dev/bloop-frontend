import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="bg-gray-900 border-b border-gray-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <div className="flex items-center justify-center w-9 h-9 rounded-md bg-gradient-to-r from-blue-500 to-purple-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="ml-3 text-xl font-mono font-bold text-white hidden sm:block">
                devConnect
              </span>
            </Link>
          </div>

          {/* Navigation Links - Visible when logged in */}
          {user && (
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              <Link
                to="/"
                className="text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to="/connections"
                className="text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Connections
              </Link>
              <Link
                to="/requests"
                className="text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Requests
              </Link>
            </div>
          )}

          {/* User Profile Section */}
          {user && (
            <div className="ml-4 flex items-center md:ml-6">
              <div className="hidden md:block mr-4">
                <span className="text-gray-300 text-sm">
                  Welcome, <span className="font-medium">{user.firstName}</span>
                </span>
              </div>

              {/* Profile dropdown */}
              <div className="ml-3 relative">
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="cursor-pointer flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
                  >
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user.photoUrl}
                      alt={user.firstName}
                    />
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-gray-800 rounded-box w-52 mt-2 border border-gray-700"
                  >
                    <li>
                      <Link
                        to="/profile"
                        className="text-gray-300 hover:bg-gray-700 px-4 py-2 text-sm flex justify-between items-center"
                      >
                        Profile
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                          New
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/connections"
                        className="text-gray-300 hover:bg-gray-700 px-4 py-2 text-sm"
                      >
                        Connections
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/requests"
                        className="text-gray-300 hover:bg-gray-700 px-4 py-2 text-sm"
                      >
                        Requests
                      </Link>
                    </li>
                    <li className="border-t border-gray-700 mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="text-gray-300 hover:bg-gray-700 px-4 py-2 text-sm text-left w-full"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;