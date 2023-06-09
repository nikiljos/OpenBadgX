import { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import OrgList from "./pages/Org/List";
import OrgHome from "./pages/Org/Home";
import OrgCreate from "./pages/Org/Create";
import OrgBadgeList from "./pages/Org/Badge/List";
import OrgBadgeCreate from "./pages/Org/Badge/Create";
import OrgBadgeDetail from "./pages/Org/Badge/Detail";
import UserBadgeList from "./pages/User/Badge/List";
import UserBadgeDetail from "./pages/User/Badge/Detail";
import PublicBadgeDetail from "./pages/Public/Badge/Detail";
import OrgBadgeAward from "./pages/Org/Badge/Award";
import OrgBadgeAssertionList from "./pages/Org/Badge/AssertionList";
import UserHome from "./pages/User/Home";
import PageNotFound from "./components/PageNotFound";
import MailUnsub from "./pages/Public/MailUnsub";
import UserDetailEdit from "./pages/User/DetailEdit";
import OrgDetailEdit from "./pages/Org/DetailEdit";

export const LoginContext = createContext();

function App() {
  const [loginStatus, updateLoginStatus] = useState({
    localStorageCheck: false,
    loggedIn: false,
    token: null,
    userDetail: null,
    orgLogin: false,
    orgDetail: null,
  });
  return (
    <div className="App">
      <LoginContext.Provider value={{ loginStatus, updateLoginStatus }}>
        <CssBaseline />
        <NavBar />
        <Box
          sx={{
            p: 5,
          }}
        >
          <Routes>
            <Route index element={<Home />} />
            <Route path="login">
              <Route index element={<Login />} />
              <Route path="verify" element={<Login />} />
            </Route>
            <Route path="org">
              <Route index element={<OrgList />} />
              <Route path="home" element={<OrgHome />} />
              <Route path="new" element={<OrgCreate />} />
              <Route path="detail" element={<OrgDetailEdit />} />
              <Route path="badge">
                <Route index element={<OrgBadgeList />} />
                <Route path="new" element={<OrgBadgeCreate />} />
                <Route path=":id">
                  <Route path="detail" element={<OrgBadgeDetail />} />
                  <Route path="award" element={<OrgBadgeAward />} />
                  <Route
                    path="assertions"
                    element={<OrgBadgeAssertionList />}
                  />
                </Route>
              </Route>
            </Route>
            <Route path="me">
              <Route index element={<UserHome />} />
              <Route path="detail" element={<UserDetailEdit />} />
              <Route path="badge">
                <Route index element={<UserBadgeList />} />
                <Route path=":id" element={<UserBadgeDetail />} />
              </Route>
            </Route>
            <Route path="badge">
              <Route path=":id" element={<PublicBadgeDetail />} />
            </Route>
            <Route path="mail">
              <Route path="unsubscribe" element={<MailUnsub />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Box>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
