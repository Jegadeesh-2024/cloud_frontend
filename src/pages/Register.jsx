
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import bg from "../assets/bg.jpg";

const Register = () => {

  const navigate = useNavigate();
   const API = import.meta.env.VITE_API_URL;


  const [form,setForm] = useState({
    name:"",
    email:"",
    password:""
  });

  const [errors,setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();

    let newErrors = {};

    if(!form.name) newErrors.name = "Name required";
    if(!form.email) newErrors.email = "Email required";
    if(!form.password) newErrors.password = "Password required";

    setErrors(newErrors);

    if(Object.keys(newErrors).length > 0) return;

    try {
      setLoading(true)   //START Loading

      const res = await axios.post(
        `${API}/register`,
        form
      );

      if(res.data.success){
        toast.success("Registration Successful");
        navigate("/");
      }else{
        toast.error(res.data.message);
      }

    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  };

  return (

    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-3 md:px-0"
      style={{ backgroundImage: `url(${bg})` }}
    >

      <div className="bg-black/40 backdrop-blur-md p-5 md:p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20 transition md:hover:scale-105">

        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-6">
          Register
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            value={form.name}
            placeholder="Name"
            onChange={handleChange}
className="w-full p-2 md:p-3 mb-3 rounded-lg text-sm md:text-base bg-white/20 text-white placeholder-gray-300 outline-none"          />

          {errors.name && (
            <p className="text-red-300 text-xs md:text-sm mb-2">
              {errors.name}
            </p>
          )}

          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="Email"
            onChange={handleChange}
className="w-full p-2 md:p-3 mb-3 rounded-lg text-sm md:text-base bg-white/20 text-white placeholder-gray-300 outline-none"          />

          {errors.email && (
            <p className="text-red-300 text-xs md:text-sm mb-2">
              {errors.email}
            </p>
          )}

          <input
            type="password"
            name="password"
            value={form.password}
            placeholder="Password"
            onChange={handleChange}
className="w-full p-2 md:p-3 mb-3 rounded-lg text-sm md:text-base bg-white/20 text-white placeholder-gray-300 outline-none"          />

          {errors.password && (
            <p className="text-red-300 text-xs md:text-sm mb-2">
              {errors.password}
            </p>
          )}

          {/* <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mt-2"
          >
            Register
          </button> */}
          <button type="submit"
  disabled={loading}
  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mt-2 flex items-center justify-center text-sm md:text-base">

  {loading ? (
  <div className="flex items-center gap-2">
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    <span>Registering...</span>
  </div>
) : (
  "Register"
)}
</button>

        </form>

       <p className="text-center text-gray-300 mt-4 text-sm md:text-base">
          Already have account?
          <Link to="/" className="text-blue-400 ml-1">
            Login
          </Link>
        </p>

      </div>

    </div>

  );

};

export default Register;