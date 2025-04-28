import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recieved/", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error("Failed to fetch requests:", err);
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0) {
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
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
          <h1 className="text-2xl font-bold text-gray-200 mb-2">
            No Connection Requests
          </h1>
          <p className="text-gray-400">
            When you receive connection requests, they'll appear here.
          </p>
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
            Connection Requests
          </h1>
          <p className="text-gray-400">
            {requests.length} {requests.length === 1 ? "request" : "requests"} waiting for your response
          </p>
        </div>

        {/* Request Cards */}
        <div className="space-y-6">
          {requests.map((request) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
              request.fromUserId;

            return (
              <div
                key={_id}
                className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg"
              >
                <div className="p-6 flex flex-col sm:flex-row gap-6">
                  {/* Profile Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={photoUrl || "https://via.placeholder.com/150?text=User"}
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
                          {age && `${age} years`} {gender && ` • ${gender}`}
                        </p>
                      </div>
                    </div>

                    {about && <p className="text-gray-300 mt-2 mb-4">{about}</p>}

                    <div className="flex gap-4 mt-4">
                      <button
                        onClick={() => reviewRequest("rejected", request._id)}
                        className="flex-1 py-2 px-4 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg font-medium transition-colors"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => reviewRequest("accepted", request._id)}
                        className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                      >
                        Accept
                      </button>
                    </div>
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

export default Requests;