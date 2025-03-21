import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice.js";
import { useDispatch ,useSelector} from "react-redux"

import OAuthAdmin from '../components/OAuthAdmin.jsx';

const AdminSignIn = () => {

  const [formData, setFormData] = useState({});
  const { loading,error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
     setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log( formData);

   const handleSubmit = async (e) => {
     e.preventDefault();
 
     try {
      dispatch(signInStart());
       const response = await fetch("/api/auth/admin/signin", {
         method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("data", data);
      
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
     navigate("/admin/dashboard");
    } catch (err) {
      dispatch(signInFailure(err));
    }
  };


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Admin Sign In</h1>
      <form onSubmit={handleSubmit} action="" className="flex flex-col gap-4" >
        
 
       
        <input
          type="email"
          placeholder="Email"
          id="email"
          onChange={handleChange}
          className="bg-slate-100 p-3 rounded-lg text-lg"
        
        />
        
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          className="bg-slate-100 p-3 rounded-lg text-lg"
          
        />
        <button
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95
        disabled:opacity-80v text-lg"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>

        <OAuthAdmin/>
      </form>

     
      
      <p className="text-red-700 mt-5">{error ? error.message || "Something went wrong!":""}</p>
    </div>
  )
}

export default AdminSignIn

