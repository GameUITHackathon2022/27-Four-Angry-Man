import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {CssBaseline} from '@mui/material'

import Home from './pages/Home';
import NoPage from "./pages/NoPage";
import Role1 from "./pages/Role1";
import Role2 from "./pages/Role2";
import Role3 from "./pages/Role3";
import Signup from "./pages/Signup";


import NavBav from './components/NavBav';
import Footer from './components/Footer';
import ScrollTop from "./components/ScrollTop";


import './App.css'

const App = () => {
    const [currentUser, setCurrentUser] = React.useState([])
    console.log(currentUser)
  return(
      <>
      <CssBaseline />
      <BrowserRouter>
      <NavBav user={currentUser}/> 
      <ScrollTop showBelow={50}/>
          <Routes>
              <Route path="/" element={currentUser === [] ? <Home /> : (currentUser.type === 'special' ? <Role3 /> : <Home/>)}  /> 
              <Route path="/home" element={currentUser === [] ? <Home /> : (currentUser.type === 'special' ? <Role3 /> : <Home/>)}  /> 
              
              <Route path="signup" element={<Signup user={currentUser} setUser={setCurrentUser}/>} /> 
              <Route path="role2" element={<Role2 />} /> 

              <Route path="*" element={<NoPage />} />
          </Routes>
      </BrowserRouter>
      </>
  );
}

export default App;