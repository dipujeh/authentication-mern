import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});

  const getUser = async () => {
    try {
      const response = await axios.get(
        "https://authentication-mern-ca9l.onrender.com/api/getdata",
        {
          withCredentials: true,
        },
      );
      setUser(response.data.user);

      // console.log(response.data.user);
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const logout = async () => {
    try {
      const response = await axios.post(
        "https://authentication-mern-ca9l.onrender.com/api/logout",
        {},
        { withCredentials: true },
      );
      toast(response.data.message);
      navigate("/login");
    } catch (error) {
      toast(error.response?.data?.message || "Logout failed");
    }
  };

  const getGreeting = () => {
    const date = new Date();
    let hours = date.getHours();
    // console.log(hours);

    if (hours < 12) {
      return "Good Morning";
    } else if (hours < 17) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  return (
    <div className="w-full text-white min-h-screen bg-[#090713] py-8 px-4 sm:px-6 md:px-8">
      <div className="relative flex justify-end items-center">
        {/* Avatar */}
        <div
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 bg-purple-600 border-amber-100 text-white flex justify-center items-center text-lg sm:text-xl cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {user.firstName?.[0].toUpperCase()}
        </div>

        {/* Dropdown */}
        <div
          className={`absolute top-14 sm:top-16 right-0 
  w-56 max-w-[calc(100vw-2rem)]
  bg-[#150F2A] rounded-xl shadow-lg p-2
  transition-all duration-300
  ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
          onMouseLeave={() => setOpen(false)}
        >
          <p className="text-lg capitalize">{`${user.firstName} ${user.lastName}`}</p>
          <p className="text font-thin ">{user.email}</p>
          <div className="border-t border-gray-700 my-2"></div>
          <Link
            to="/dashboard/profile"
            className="block px-3 py-2 rounded-lg hover:bg-[#090713] cursor-pointer"
          >
            Profile
          </Link>

          <button
            className="w-full text-left px-3 py-2 rounded-lg text-red-500 hover:bg-[#090713] cursor-pointer"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="w-full  flex justify-center items-center flex-col overflow-hidden">
        <div className="w-80 h-80 rounded-full overflow-hidden border-2 border-amber-100">
          <img
            src={user.profileImg}
            alt="user"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mt-12 sm:mt-16">
          {getGreeting()},{" "}
          <span className="text-purple-600 capitalize">{user.firstName}</span>{" "}
          👋
        </h1>
        <p className="text-center text-base sm:text-lg md:text-2xl mt-3 sm:mt-4 px-2">
          Welcome back! Here's what's happening today.
        </p>
      </div>
      <Outlet />
    </div>
  );
};

export default Dashboard;
