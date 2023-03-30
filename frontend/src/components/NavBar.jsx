import { KeyboardArrowDown } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";
import fetchBackend from "../utils/fetchBackend";
import { getLocalToken, setLocalToken } from "../utils/localToken";

const NavBar = () => {
  const { loginStatus, updateLoginStatus } = useContext(LoginContext);
  const navigate = useNavigate();

  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const [orgMenuAnchor, setOrgMenuAnchor] = useState(null);
  const [orgMenuOpen, setOrgMenuOpen] = useState(false);

  const handleTokenExpiry=()=>{
    updateLoginStatus((prev) => ({
      ...prev,
      loggedIn: false,
      token: null,
      userDetail: null,
      orgDetail: null,
    }));
    setLocalToken(null);
  }


  //check localStorage for Token
  useEffect(() => {
    if (!loginStatus.localStorageCheck) {
      let loggedIn=false;
      let oldToken = getLocalToken();
      if(oldToken) loggedIn=true
      updateLoginStatus((prev) => ({
        ...prev,
        localStorageCheck: true,
        loggedIn,
        token: oldToken,
      }));
    }

    (async () => {
      if (loginStatus.loggedIn && !loginStatus.userDetail) {
        let detail = await fetchBackend(
          "user/detail",
          "GET",
          loginStatus.token,
          null
        )
          .then((data) => data.data)
          .catch((err) => {
            if(err.detailCode==="invalid_token") handleTokenExpiry();
            else console.log("Error: ", err);
          });
        // console.log(detail);
        detail &&
          updateLoginStatus((prev) => ({
            ...prev,
            userDetail: detail.userDetail,
            orgLogin: detail.orgLogin,
          }));
      }
      if (loginStatus.orgLogin && !loginStatus.orgDetail) {
        let orgDetail = await fetchBackend(
          "org/detail",
          "GET",
          loginStatus.token,
          null
        )
          .then((data) => data.data)
          .catch((err) => {
            console.log("Error:", err)  
          });

        orgDetail &&
          updateLoginStatus((prev) => ({
            ...prev,
            orgDetail,
          }));
      }
    })();
  }, [loginStatus]);

  const toggleUserMenu = (e) => {
    setUserMenuAnchor(e.target);
    setUserMenuOpen((prev) => !prev);
  };
  const toggleOrgMenu = (e) => {
    setOrgMenuAnchor(e.target);
    setOrgMenuOpen((prev) => !prev);
  };

  const goFromMenu = (route) => {
    navigate(route);
    setUserMenuOpen(false);
    setOrgMenuOpen(false)
  };

  return (
    <AppBar color="transparent" position="relative">
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 2,
            m: 0,
          }}
        >
          {/* org selector menu */}
          <Box>
            <Typography variant="h6" onClick={() => navigate("/")}>
              OpenBadgX
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {loginStatus.loggedIn ? (
              <Box
                sx={{
                  mr: 1,
                }}
              >
                <Button
                  endIcon={<KeyboardArrowDown />}
                  variant="primary"
                  onClick={toggleOrgMenu}
                  sx={{
                    textTransform: "none",
                  }}
                >
                  {loginStatus.orgDetail
                    ? loginStatus.orgDetail.key
                    : "Select Org"}
                </Button>
                <Menu open={false}></Menu>
              </Box>
            ) : (
              ""
            )}

            <Box>
              {/* user menu */}
              <IconButton onClick={toggleUserMenu} sx={{ p: 0 }}>
                <Avatar
                  src={
                    loginStatus.userDetail
                      ? loginStatus.userDetail.profileImage
                      : ""
                  }
                  alt={
                    loginStatus.userDetail ? loginStatus.userDetail.name : null
                  }
                />
              </IconButton>

              <Menu
                open={userMenuOpen}
                anchorEl={userMenuAnchor}
                onClose={toggleUserMenu}
              >
                {loginStatus.userDetail ? (
                  [
                    <MenuItem
                      key="detail"
                      onClick={() => goFromMenu("/me")}
                    >
                      {loginStatus.userDetail.name}
                    </MenuItem>,
                    <MenuItem key="login" onClick={() => goFromMenu("/login")}>
                      Logout
                    </MenuItem>,
                  ]
                ) : (
                  <MenuItem onClick={() => goFromMenu("/login")}>
                    Login
                  </MenuItem>
                )}
              </Menu>

              <Menu
                open={orgMenuOpen}
                anchorEl={orgMenuAnchor}
                onClose={toggleOrgMenu}
              >
                {loginStatus.orgLogin ? (
                  [
                    <MenuItem key="detail" onClick={() => goFromMenu("/org/home")}>
                      Organization Home
                    </MenuItem>,
                    <MenuItem key="login" onClick={() => goFromMenu("/org")}>
                      Change Organization
                    </MenuItem>,
                  ]
                ) : (
                  <MenuItem onClick={() => goFromMenu("/org")}>
                    Select Organization
                  </MenuItem>
                )}
              </Menu>
            </Box>
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
};

export default NavBar;
