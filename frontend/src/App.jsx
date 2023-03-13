import './App.css'
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import { createContext, useState } from 'react';
import NavBar from './components/NavBar';
import OrgList from './pages/Org/List';
import OrgHome from './pages/Org/Home';
import OrgCreate from './pages/Org/Create';
import OrgBadgeList from './pages/Org/Badge/List';
import OrgBadgeCreate from './pages/Org/Badge/Create';
import OrgBadgeDetail from './pages/Org/Badge/Detail';

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
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="org">
            <Route index element={<OrgList />} />
            <Route path="home" element={<OrgHome />} />
            <Route path="new" element={<OrgCreate />} />
            <Route path="badge">
              <Route index element={<OrgBadgeList />} />
              <Route path="new" element={<OrgBadgeCreate />} />
              <Route path=":id">
                <Route path="detail" element={<OrgBadgeDetail />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </LoginContext.Provider>
    </div>
  );
}

export default App
