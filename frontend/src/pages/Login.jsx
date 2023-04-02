import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../App";
import fetchBackend from "../utils/fetchBackend";
import { setLocalToken } from "../utils/localToken";
import { Box, Button, Divider, FormControl, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import BannerAlert from "../components/BannerAlert";
import { ArrowForwardIos, Home } from "@mui/icons-material";
import Loading from "../components/Loading";

const Login = () => {
  const { loginStatus, updateLoginStatus } = useContext(LoginContext);
  const [alertData,updateAlertData]=useState(null)
  const [reloginStatus,updateReloginStatus]=useState(false)

  const [mailInput,updateMailInput]=useState("")
  const [nameInput,updateNameInput]=useState("")
  const [signup,updateSignup]=useState(false)

  const navigate=useNavigate()
  const [searchParams]=useSearchParams()
  const location=useLocation()

  const setAlert=(type,message)=>updateAlertData({
      type,
      message,
    });

  const handleLoginSuccess=(token)=>{
    updateLoginStatus((prev) => ({
      ...prev,
      loggedIn: true,
      localStorageCheck: true,
      token: token,
      userDetail: null,
      orgDetail: null,
    }));
    setLocalToken(token);
    setAlert("success","Successfully Logged in! Redirecting...");
    setTimeout(() => navigate("/me"), 1000);
  }

  const handleGAuth=async(googleData)=>{
    setAlert("info","Loading...")
    let gAuthToken = googleData.credential;
    let token = await fetchBackend("auth/google", "POST", null, {
      gAuthToken,
    })
      .then((data) => data.data?.accessToken)
      .catch((err) => {
        console.log("Error: ", err)
        setAlert("error","Login Failed!")
      });
    if(token) handleLoginSuccess(token)
  }

  const handleMailInit=async (e)=>{
    e.preventDefault()
    setAlert("info","Loading...")
    if(mailInput===""){
      setAlert("error","Invalid Email")
      return
    }
    if(signup&&nameInput===""){
      setAlert("info","Name is required")
      return
    }
    const initResponse=await fetchBackend("auth/mail/init","POST",null,{
      name:nameInput,
      email:mailInput
    })
    .catch(err=>{
      if(err.detailCode==="new_user"){
        updateSignup(true)
        updateAlertData(null)
      }
      else{
        setAlert("error",err.message)
      }
    })
    if(initResponse) setAlert("success","Please check your mail to continue login...")
  }

  const handleMailVerify=async ()=>{
    const token = searchParams.get("secret");
    if (!token || token === "") {
      setAlert(
        "error",
        "Invalid Secret. Please confirm wether you are using the correct URL"
      );
      return;
    }
    setAlert("info","Loading...")
    let accessToken=await fetchBackend("auth/mail/verify","POST",null,{
      mailToken:token
    })
    .then(res=>res.data.accessToken)
    .catch(err=>setAlert("error",err.message))
    if(accessToken) handleLoginSuccess(accessToken)
  }

  const logOut = () => {
    updateLoginStatus((prev) => ({
      ...prev,
      loggedIn: false,
      token: null,
      userDetail: null,
      orgLogin: false,
      orgDetail: null,
    }));
    setLocalToken(null);
    setAlert("info","Logged Out!");
  };

  useEffect(()=>{
    updateAlertData(null)
    if(location.pathname.includes("verify")){
      updateReloginStatus(false)
      if (!loginStatus.localStorageCheck) return;
      if (loginStatus.localStorageCheck && loginStatus.loggedIn) {
        updateReloginStatus(true);
        return;
      }
      handleMailVerify()
    }
  },[location.pathname,loginStatus.localStorageCheck])

  if(!loginStatus.localStorageCheck) return <Loading/>

  if(location.pathname.includes("verify")){
    return (
      <Box>
        {reloginStatus ? (
          <Box>
            <Typography variant="body1">
              You are already logged in as {loginStatus?.userDetail?.name}.{" "}
              <br />
              Do you wish to log out and continue with the new user?
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 3,
              }}
            >
              Click on <span style={{ fontWeight: "bold" }}>Continue</span> to
              login as the new user.
              <br />
              Click Cancel to keep previous login.
            </Typography>
            <Box
              sx={{
                mt: 3,
              }}
            >
              <Button
                variant="contained"
                color="success"
                onClick={handleMailVerify}
                sx={{
                  mr: 3,
                }}
              >
                Continue
              </Button>
              <Button component={Link} to="/me" color="secondary">
                Cancel
              </Button>
            </Box>
          </Box>
        ) : (
          <Typography variant="h5">
            Please wait while we log you in...
          </Typography>
        )}

        <BannerAlert status={alertData} />
        <Button
          variant="outlined"
          component={Link}
          to="/"
          sx={{
            my: 5,
          }}
          endIcon={<Home />}
        >
          Home
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        {loginStatus.loggedIn ? (
          <>
            <Typography variant="h6">
              You are logged in as {loginStatus?.userDetail?.name}
            </Typography>
            <Button
              onClick={logOut}
              variant="outlined"
              color="error"
              sx={{ mt: 5 }}
            >
              Log Out
            </Button>
          </>
        ) : (
          <>
            {!signup ? (
              <>
                <Typography sx={{ mb: 2, fontSize: "1rem", fontWeight: 600 }}>
                  Continue with Google
                </Typography>
                <GoogleLogin
                  onSuccess={handleGAuth}
                  onError={(err) => {
                    console.log("Google Login Failed", err);
                    setAlert("error", "Google Auth Failed");
                  }}
                />
                <Divider
                  sx={{
                    width: "70%",
                    my: 7,
                  }}
                >
                  Or
                </Divider>
                <Typography sx={{ mb: 1, fontSize: "1rem", fontWeight: 600 }}>
                  Enter your email to Login / Signup
                </Typography>
              </>
            ) : (
              <Typography variant="h6">
                Please give us a bit more detail to sign up!
              </Typography>
            )}
            <Box
              sx={{
                "& > div": {
                  mt: 2,
                },
              }}
            >
              <Box>
                <TextField
                  type="text"
                  variant="outlined"
                  size="small"
                  label="Email"
                  value={mailInput}
                  onChange={(e) => updateMailInput(e.target.value)}
                />
                {!signup ? (
                  <IconButton
                    sx={{
                      ml: 1,
                    }}
                    onClick={handleMailInit}
                  >
                    <ArrowForwardIos />
                  </IconButton>
                ) : null}
              </Box>
              {signup ? (
                <FormControl>
                  <TextField
                    type="text"
                    variant="outlined"
                    size="small"
                    label="Name"
                    value={nameInput}
                    onChange={(e) => updateNameInput(e.target.value)}
                  />
                  <Button
                    sx={{
                      width: "fit-content",
                      mx: "auto",
                      mt: 2,
                    }}
                    onClick={handleMailInit}
                  >
                    Sign Up
                  </Button>
                </FormControl>
              ) : null}
            </Box>
          </>
        )}
      </GoogleOAuthProvider>
      <BannerAlert status={alertData} />
    </Box>
  );
};

export default Login;
