import React from 'react'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom'

const OAuth = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
       try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);
        const result = await signInWithPopup(auth ,provider);
        console.log("res",result);

        const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL,
            })
        })
         
        const data = await res.json();
        console.log("data",data);
        dispatch(signInSuccess(data));
        navigate('/');

       } catch (error) {
          console.log('Could not login with google',error); 
       } 
    }

  return (
    <button type="button" onClick={handleGoogleClick}  className='bg-red-700 text-lg text-white uppercase p-3 rounded-lg
    hover:opacity-90'>Continue with google</button>
  )
}

export default OAuth
