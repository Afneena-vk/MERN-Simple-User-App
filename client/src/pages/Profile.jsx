import React from 'react'
import { useSelector } from "react-redux";
import {  useRef , useState ,useEffect } from "react";
import { toast } from "react-toastify";

function Profile() {

  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [loadImage, setLoadImage] = useState(false);
  const [imageError, setImageError] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (file) => {
    if (!file) return;
    setLoadImage(true);
    setImageError(null);
    console.log("file", file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );
    formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
    try {
      const response = await fetch(import.meta.env.VITE_CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("Uploaded data", data);

      if (!response.ok) {
        throw new Error(
          data.error?.message || "Upload failed. Please try again."
        );
      }
      if (data.secure_url) {
        setFormData((prev) => ({ ...prev, profilePicture: data.secure_url }));
        setImageError(null);
        toast.success("Image uploaded successfully! 🎉");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setImageError(err.message || "Something went wrong. Please try again.");
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoadImage(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" >
      <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
           onChange={(e) => setImage(e.target.files[0])}
        />

         <img src={currentUser.profilePicture} alt="profile" className="h-24 w-24 self-center
        cursor-pointer rounded-full object-cover mt-2" 
        onClick={() => fileRef.current.click()}
        />

        {loadImage && (
          <p className="text-blue-500 mt-2 self-center">Uploading image...</p>
        )}
        {imageError && (
          <p className="text-red-500 text-sm self-center">{imageError}</p>
        )}

        <input
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
          className="bg-slate-100 rounded-lg p-3"
          // onChange={handleChange}
        />
        {/* {usernameError && (
          <p className="text-red-500 text-sm">{usernameError}</p>
        )} */}
        <input
          type="text"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          className="bg-slate-100 rounded-lg p-3"  
          // onChange={handleChange}
        />
        {/* {emailError && (
          <p className="text-red-500 text-sm">{emailError}</p>
        )} */}
        <input
          type="text"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
          // onChange={handleChange}
        />

       <button
          className="bg-slate-700 text-white p-3 rounded-lg
        uppercase hover:opacity-95 disabled:opacity-80"
        >
          {/* {loading ? 'Loading...' : 'Update'} */} Update
        </button>

      </form>
     
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer" >Delete Account</span>
        <span className="text-red-700 cursor-pointer" >Sign out</span>
      </div>
        
      {/* <p className="text-red-700 mt-5 text-center">{error && 'Something went wrong!'}</p>
      <p className="text-green-700 mt-5 text-center">{updateSuccess && 'User updated successfully!'}</p> */}

    </div>
  )
}

export default Profile
