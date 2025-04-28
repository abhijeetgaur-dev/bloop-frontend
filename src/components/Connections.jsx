import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections/", { 
        withCredentials: true 
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log("Something Went Wrong " + err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center p-8 bg-gray-800 rounded-xl border border-gray-700 max-w-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <h1 className="text-2xl font-bold text-gray-200 mb-2">
            No Connections Found
          </h1>
          <p className="text-gray-400 mb-6">
            Start connecting with other developers to see them here.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition-colors"
          >
            Discover Developers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">
            Your Developer Network
          </h1>
          <p className="text-gray-400">
            {connections.length} {connections.length === 1 ? "connection" : "connections"}
          </p>
        </div>

        {/* Connection Cards */}
        <div className="space-y-6">
          {connections.map((user) => {
            const { _id, firstName, lastName, about, age, gender, photoUrl, skills } = user;
            return (
              <div
                key={_id}
                className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6 flex flex-col sm:flex-row gap-6">
                  {/* Profile Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={photoUrl}
                      alt={`${firstName} ${lastName}`}
                      className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
                    />
                  </div>

                  {/* Profile Info */}
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-bold text-gray-100">
                          {firstName} {lastName}
                        </h2>
                        <p className="text-sm text-gray-400 mb-2">
                          {age} • {gender}
                        </p>
                      </div>
                      <Link
                        to={`/chat/${_id}`}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm font-medium transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        Chat
                      </Link>
                    </div>

                    <p className="text-gray-300 mt-2 mb-4">{about}</p>

                    {skills && skills.length > 0 && (
                      <div className="mt-4">
                        <h3 className="text-sm font-medium text-gray-400 mb-2">
                          Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-700 text-blue-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Connections;