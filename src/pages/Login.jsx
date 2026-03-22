
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import bg from "../assets/bg.jpg";

const Login = () => {

  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;
  const AUTH_API=import.meta.env.VITE_AUTH_API_URL;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      
      navigate("/folder");
    }
  }, []);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {

      const res = await axios.post(
        `${API}/login`,
        form
      );

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        toast.success("Login Successful");
        navigate("/folder");
      } else {
        toast.error(res.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error("Server Error");
    }
  };

  return (

    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >

      <div className="bg-black/40 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-96">

        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 mb-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none"
          />

          {errors.email && (
            <p className="text-red-300 text-sm mb-2">
              {errors.email}
            </p>
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 mb-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none"
          />

          {errors.password && (
            <p className="text-red-300 text-sm mb-2">
              {errors.password}
            </p>
          )}

          <button
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg mt-2"
          >
            Login
          </button>

        </form>
        <p className="text-white text-center mt-3">OR</p>

        <button
          onClick={()=>window.open(`${AUTH_API}/google`,"_self")}
          className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
        >
          Login with Google
        </button>

        <p className="text-center text-gray-300 mt-4">
          Don't have account?
          <Link to="/register" className="text-blue-400 ml-1">
            Register
          </Link>
        </p>

      </div>

    </div>

  );

};

export default Login;
