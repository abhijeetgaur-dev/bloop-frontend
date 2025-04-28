import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { motion, AnimatePresence } from "framer-motion";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwipe = (direction) => {
    if (direction === "left") {
      // Handle ignore action
    } else {
      // Handle interested action
    }
    setCurrentIndex((prev) => (prev + 1) % feed.length);
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!feed || feed.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 max-w-md">
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
              d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <h1 className="text-2xl font-bold text-gray-200 mb-2">
            No new users found
          </h1>
          <p className="text-gray-400 mb-6">
            We've run out of potential matches for now. Check back later!
          </p>
          <button
            onClick={getFeed}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition-colors"
          >
            Refresh Feed
          </button>
        </div>
      </div>
    );
  }

  return (feed.length) && (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-md h-[70vh]">
        <AnimatePresence>
          {feed.length > 0 && currentIndex < feed.length && (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ duration: 0.3 }}
              className="absolute w-full h-full"
            >
              <UserCard user={feed[currentIndex]} onSwipe={handleSwipe} />
            </motion.div>
          )}
        </AnimatePresence>

        {feed.length > 0 && currentIndex >= feed.length - 1 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-400">You've reached the end of the feed</p>
          </div>
        )}
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={() => handleSwipe("left")}
          className="p-4 bg-gray-700 hover:bg-gray-600 rounded-full text-white transition-colors"
          disabled={currentIndex >= feed.length}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <button
          onClick={() => handleSwipe("right")}
          className="p-4 bg-blue-600 hover:bg-blue-700 rounded-full text-white transition-colors"
          disabled={currentIndex >= feed.length}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Feed;