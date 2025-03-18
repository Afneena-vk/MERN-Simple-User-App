import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";


const SignUp = () => {

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
     setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log( formData);

   const handleSubmit = async (e) => {
     e.preventDefault();
  //   const isUsernameValid = validateUsername(formData.username);
  //   const isEmailValid = validateEmail(formData.email);
  //   const isPasswordValid = validatePassword(formData.password);
  //   if (!isUsernameValid || !isEmailValid || !isPasswordValid) {
  //     if (!isUsernameValid) {
  //       setUsernameError(
  //         "Invalid username. It should be between 3 and 15 characters."
  //       );
  //     } else {
  //       setUsernameError("");
  //     }

  //     if (!isEmailValid) {
  //       setEmailError("Invalid email format.");
  //     } else {
  //       setEmailError("");
  //     }

  //     if (!isPasswordValid) {
  //       setPasswordError(
  //         "Password must be at least 5 characters long and include both letters and numbers."
  //       );
  //     } else {
  //       setPasswordError("");
  //     }

  //     return;
  //   }
     try {
      setLoading(true);
      setError(false);
       const response = await fetch("/api/auth/signup", {
         method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("data", data);
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
  //     navigate("/sign-in");
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  };


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">SignUp</h1>
      <form onSubmit={handleSubmit} action="" className="flex flex-col gap-4" >
        
      <input
          type="text"
          placeholder="Username"
          id="username"
          onChange={handleChange}
          className="bg-slate-100 p-3 rounded-lg text-lg"
        />
       
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
          {loading ? "Loading..." : "Sign Up"}
        </button>
       
      </form>

      <div className="flex gap-2 mt-5 text-lg">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
      
      <p className="text-red-700 mt-5">{error && "Something went wrong!"}</p>
    </div>
  )
}

export default SignUp
