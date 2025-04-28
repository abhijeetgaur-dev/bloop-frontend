import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
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
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
          {/* Header with code-themed decoration */}
          <div className="bg-gray-900 px-6 py-4 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <h2 className="text-xl font-mono font-bold text-gray-200 ml-4">
                {isLoginForm ? "devConnect()" : "devSignUp()"}
              </h2>
            </div>
          </div>

          <div className="p-6">
            {/* Form */}
            {!isLoginForm && (
              <div className="space-y-4 mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
                  placeholder="developer@example.com"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && (
                <div className="text-red-400 text-sm p-2 bg-red-900/30 rounded-lg">
                  {error}
                </div>
              )}

              <button
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                  isLoginForm
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
                onClick={isLoginForm ? handleLogin : handleSignUp}
              >
                {isLoginForm ? "Login" : "Create Account"}
              </button>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLoginForm((value) => !value)}
                className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
              >
                {isLoginForm ? (
                  <>
                    New to devConnect?{" "}
                    <span className="font-medium text-blue-400">Sign up</span>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <span className="font-medium text-blue-400">Login</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Footer with subtle tech vibe */}
          <div className="bg-gray-900/50 px-6 py-3 border-t border-gray-700">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">
                {isLoginForm ? "// Find your dev match" : "// Join our community"}
              </span>
              <span className="text-xs text-gray-500">v1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;