import './App.css'
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import { createContext, useState } from 'react';
import NavBar from './components/NavBar';
import OrgList from './pages/Org/List';

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
          <Route path="/org" element={<OrgList/>}/>
        </Routes>
      </LoginContext.Provider>
    </div>
  );
}

export default App
