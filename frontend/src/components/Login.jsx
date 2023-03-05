import { Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useContext, useEffect, useState } from "react";
import "./Login.css";
import { LoginContext } from "../App";
import fetchBackend from "../utils/fetchBackend";

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
        console.log(token);
        if (!token) return;
        updateLoginStatus((prev) => ({
          ...prev,
          loggedIn: true,
          localStorageCheck:true,
          token: token,
          userDetail: null,
          orgDetail: null,
        }));
        window.localStorage.setItem("token", token);
      })();
    }
  }, [gAuth]);

  console.log(loginStatus.token);
  return (
    <div>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <h2>Login Happens here</h2>
        <div className="detail">
          <Link to="/">Go Home 🏠</Link>
          <div>{loginStatus.loggedIn ? "Logged In" : "Logged Out"}</div>
        </div>
        <GoogleLogin
          onSuccess={updateGAuth}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default Login;
