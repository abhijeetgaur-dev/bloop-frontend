import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUserFromFeed } from "../utils/feedSlice";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

const UserCard = ({ user, isPreview = false, onSwipe }) => {
  const { _id, firstName, lastName, photoUrl, about, age, gender } = user;
  const dispatch = useDispatch();
  const [isDragging, setIsDragging] = useState(false);
  const controls = useAnimation();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
      if (onSwipe) onSwipe(status === "interested" ? "right" : "left");
    } catch (err) {
      console.log("Something went wrong" + err);
    }
  };

  const handleDragEnd = async (event, info) => {
    setIsDragging(false);
    
    // Minimum swipe distance to trigger action
    const swipeThreshold = 100;
    
    if (info.offset.x > swipeThreshold) {
      // Swiped right - Interested
      await controls.start({ 
        x: 500,
        opacity: 0,
        transition: { duration: 0.3 }
      });
      handleSendRequest("interested", _id);
    } else if (info.offset.x < -swipeThreshold) {
      // Swiped left - Ignored
      await controls.start({ 
        x: -500,
        opacity: 0,
        transition: { duration: 0.3 }
      });
      handleSendRequest("ignored", _id);
    } else {
      // Return to center if not swiped enough
      controls.start({ 
        x: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 500, damping: 30 }
      });
    }
  };

  return (
    <motion.div
      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 w-full max-w-md relative"
      drag={!isPreview ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      animate={controls}
      initial={{ x: 0, opacity: 1 }}
      style={{ touchAction: 'pan-y' }}
    >
      {/* Swipe Direction Indicators */}
      {!isPreview && isDragging && (
        <>
          <motion.div
            className="absolute inset-0 bg-red-500/20 flex items-center justify-start p-8"
            animate={{
              opacity: isDragging ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-2xl font-bold text-white border-2 border-white rounded-full w-12 h-12 flex items-center justify-center">
              ✖
            </div>
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-blue-500/20 flex items-center justify-end p-8"
            animate={{
              opacity: isDragging ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-2xl font-bold text-white border-2 border-white rounded-full w-12 h-12 flex items-center justify-center">
              ❤
            </div>
          </motion.div>
        </>
      )}

      {/* Profile Content */}
      <div className="relative">
        <img
          src={photoUrl || "https://via.placeholder.com/400x200?text=Profile"}
          alt={`${firstName} ${lastName}`}
          className="w-full h-48 object-cover"
        />
        <div className="absolute -bottom-12 left-6">
          {/* <div className="w-24 h-24 rounded-full border-4 border-gray-800 overflow-hidden bg-gray-700">
            <img
              src={photoUrl || "https://via.placeholder.com/150?text=User"}
              alt={`${firstName} ${lastName}`}
              className="w-full h-full object-cover"
            />
          </div> */}
        </div>
      </div>

      <div className="pt-16 px-6 pb-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-100">
            {firstName} {lastName}
          </h2>
          <p className="text-gray-400">
            {age && `${age} years`} {gender && ` • ${gender}`}
          </p>
        </div>

        {about && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-400 mb-1">About</h3>
            <p className="text-gray-300">{about}</p>
          </div>
        )}

        {!isPreview && (
          <div className="flex justify-between gap-4 mt-6">
            <button
              onClick={() => handleSendRequest("ignored", _id)}
              className="flex-1 py-2 px-4 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg font-medium transition-colors"
            >
              Ignore
            </button>
            <button
              onClick={() => handleSendRequest("interested", _id)}
              className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default UserCard;