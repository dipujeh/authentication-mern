import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import { ToastContainer } from "react-toastify";
import Profile from "./Pages/Profile";
import NotFound from "./Pages/NotFound";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route  path="/dashboard" element={<Dashboard />}>

          <Route path="profile" element={<Profile/>} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
