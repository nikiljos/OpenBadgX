import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../App";
import fetchBackend from "../utils/fetchBackend";
import { setLocalToken } from "../utils/localToken";
import { Box, Button, Typography } from "@mui/material";
import BannerAlert from "../components/BannerAlert";

const Login = () => {
  const { loginStatus, updateLoginStatus } = useContext(LoginContext);
  const [gAuth, updateGAuth] = useState(null);
  const [alertData,updateAlertData]=useState(null)
  const navigate=useNavigate()

  useEffect(() => {
    if (gAuth) {
      (async () => {
        updateAlertData({
          type: "info",
          message: "Loading...",
        });
        let gAuthToken = gAuth.credential;
        let token = await fetchBackend("auth/google", "POST", null, {
          gAuthToken,
        })
          .then((data) => data.data.accessToken)
          .catch((err) => console.log("Error: ", err));
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
        updateAlertData({
          type: "success",
          message: "Successfully Logged in! Redirecting...",
        });
        setTimeout(() => navigate("/me"), 1000);
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
    updateAlertData({
      type: "info",
      message: "Logged Out!",
    });
  };

  return (
    <Box sx={{
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
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
            <Typography variant="h6" sx={{mb:5}}>Login with Google to continue!</Typography>
            <GoogleLogin
              onSuccess={updateGAuth}
              onError={(err) => {
                console.log("Login Failed",err);
                updateAlertData({
                  type:"error",
                  message:"Google Auth Failed"
                })
              }}
            />
          </>
        )}
      </GoogleOAuthProvider>
      <BannerAlert status={alertData}/>
    </Box>
  );
};

export default Login;
