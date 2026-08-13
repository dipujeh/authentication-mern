import axios from "axios";
import React, {useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  
  const logout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8001/api/logout",
        {},
        { withCredentials: true },
      );
      toast(response.data.message);
      navigate("/login");
    } catch (error) {
      toast(error.response?.data?.message || "Logout failed");
    }
  };


  return (
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
  )
}

export default Navbar