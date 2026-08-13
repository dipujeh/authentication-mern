import React, { useRef, useState } from "react";
import dp from "../assets/dp.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

   const [FrontendImage,setFrontendImage] = useState(dp);
   const [backendImage,setBackendImage] = useState(null);

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
        formData.append("firstName",firstName);
        formData.append("lastName",lastName);
        formData.append("course",course);
        formData.append("email",email);
        formData.append("password",password);
        formData.append("profileImg",backendImage);
      const response = await axios.post(
        "http://localhost:8001/api/signup",formData,
        {
          withCredentials: true
          // headers:{"Content-Type":"multipart/form-data"}
        }
      );
      setFirstName("");
      setLastName("");
      setCourse("");
      setEmail("");
      setPassword("");
      toast.success(response?.data?.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }

  };

  const handleImage = (e)=>{
    // console.log(e.target.files[0]);

    
    let file = e.target.files[0]; //select image from file
       if (!file) return;
    setBackendImage(file)

    let imageUrl = URL.createObjectURL(file)
    setFrontendImage(imageUrl)
    
  }

  return (
    <div className="w-full min-h-screen bg-gray-200 flex justify-center items-center">
      <form
        className="w-87.5 h-137.5  flex flex-col gap-4  rounded-xl bg-white px-8 py-2 "
        onSubmit={signupHandler}
      >
        <div className="flex flex-col justify-center items-center gap-4">
          <h2 className="text-center font-medium text-2xl mt-4 text-[#283346]">
            Signup
          </h2>
          <div className="relative w-20 h-20 rounded-full overflow-hidden border group cursor-pointer">
            <img
              src={FrontendImage}
              alt="image"
              className="w-full h-full object-cover transition-all duration-300 group-hover:opacity-40 group-hover:scale-110"
            />

            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={() => inputRef.current.click()}
            >
              <span className="text-3xl text-black font-bold">+</span>
              <input
                type="file"
                ref={inputRef}
                accept="image/*"
                className="hidden"
                onChange={handleImage}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex  gap-2">
          <input
            type="text"
            placeholder="First Name"
            required
            className=" border border-gray-400 text-gray-900 w-full px-3 rounded-lg outline-none py-2 "
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <input
            type="text"
            placeholder="Last Name"
            required
            className=" border border-gray-400 text-gray-900 w-full px-3 rounded-lg outline-none py-2 "
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </div>
        <select
          className=" border cursor-pointer border-gray-400 text-gray-900 w-full px-3 rounded-lg outline-none py-2 "
          required
          onChange={(e) => setCourse(e.target.value)}
          value={course}
        >
          <option value="" className="text-gray-400">
            Select Course
          </option>
          <option value="BCA">BCA</option>
          <option value="MCA">MCA</option>
          <option value="BTech CSE">BTech CSE</option>
          <option value="MTech">MTech</option>
          <option value="BBA">BBA</option>
        </select>
        <input
          type="email"
          placeholder="Email"
          required
          className=" border border-gray-400 text-gray-900 w-full px-3 rounded-lg outline-none py-2 "
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className=" border border-gray-400 text-gray-900 w-full px-3 rounded-lg outline-none py-2 "
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button
          type="submit"
          className="bg-amber-200 py-4 cursor-pointer rounded-lg"
        >
          Signup
        </button>
        <p className="text-center">
          Already have an account?{" "}
          <span
            className="cursor-pointer hover:underline text-blue-500"
            onClick={() => navigate("/login")}
          >
            Login
          </span>{" "}
        </p>
      </form>
    </div>
  );
};

export default Signup;
