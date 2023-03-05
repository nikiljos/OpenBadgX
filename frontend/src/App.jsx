import './App.css'
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import { createContext, useState } from 'react';
import NavBar from './components/NavBar';
import OrgList from './pages/Org/List';
import OrgHome from './pages/Org/Home';
import OrgCreate from './pages/Org/Create';

export const LoginContext=createContext()

function App() {

  const [loginStatus, updateLoginStatus] = useState({
    localStoreCheck:false,
    loggedIn: false,
    token: null,
    userDetail:null,
    orgLogin:false,
    orgDetail:null
  });

  return (
    <div className="App">
      <LoginContext.Provider value={{ loginStatus, updateLoginStatus }}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/org" element={<OrgList />} />
          <Route path="/org/home" element={<OrgHome />} />
          <Route path="/org/new" element={<OrgCreate />} />
        </Routes>
      </LoginContext.Provider>
    </div>
  );
}

export default App
