// import React from "react";
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Signin from './pages/Signin'
import Profile from './pages/Profile'
import About from './pages/About'
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute'
import PrivateAdminRoute from './components/PrivateAdminRoute';
import AdminSignIn from './pages/AdminSignIn';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About />} />
      <Route path="/sign-in" element={<Signin />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/admin/sign-in" element={<AdminSignIn/>}/>
      <Route element={<PrivateAdminRoute />}>
         <Route path="/admin/dashboard" element={<Dashboard />} />
      </Route>  
     
    </Routes>
    </BrowserRouter>
  );
}

export default App;