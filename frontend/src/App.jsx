import './App.css'
import { Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import { createContext, useState } from 'react';
import NavBar from './components/NavBar';

export const LoginContext=createContext()

function App() {

  const [loginStatus, updateLoginStatus] = useState({
    localStoreCheck:false,
    loggedIn: false,
    token: null,
    userDetail:null,
    orgDetail:null
  });

  return (
    <div className="App">
      <LoginContext.Provider value={{loginStatus,updateLoginStatus}}>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orgs"/>
        </Routes>
      </LoginContext.Provider>
    </div>
  );
}

export default App
