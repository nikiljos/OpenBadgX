import { Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../App";
import fetchBackend from "../utils/fetchBackend";
import { setLocalToken } from "../utils/localToken";
import { Box, Button, Typography } from "@mui/material";

const Login = () => {
  const { loginStatus, updateLoginStatus } = useContext(LoginContext);
  const [gAuth, updateGAuth] = useState(null);

  useEffect(() => {
    if (gAuth) {
      (async () => {
        let gAuthToken = gAuth.credential;
        let token = await fetchBackend("auth/google", "POST", null, {
          gAuthToken,
        })
          .then((data) => data.data.accessToken)
          .catch((err) => console.log("Error: ", err));
        // console.log(token);
        if (!token) return;
        updateLoginStatus((prev) => ({
          ...prev,
          loggedIn: true,
          localStorageCheck: true,
          token: token,
          userDetail: null,
          orgDetail: null,
        }));
        setLocalToken(token);
      })();
    }
  }, [gAuth]);

  const logOut = () => {
    updateLoginStatus((prev) => ({
      ...prev,
      loggedIn: false,
      token: null,
      userDetail: null,
      orgDetail: null,
    }));
    setLocalToken(null);
  };

  // console.log(loginStatus.token);
  return (
    <Box sx={{
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      "& *":{
        mt:3
      }
    }}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        {loginStatus.loggedIn ? (
          <>
            <Typography variant="h6">You are logged in!</Typography>
            <Button onClick={logOut} variant="outlined" color="error" sx={{mt:5}}>
              Log Out
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h6">Login with Google to continue!</Typography>
            <GoogleLogin
              onSuccess={updateGAuth}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </>
        )}
      </GoogleOAuthProvider>
    </Box>
  );
};

export default Login;
