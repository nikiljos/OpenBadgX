import { Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import "./Login.css"
import { LoginContext } from "../App";

const Login = () => {
  const { loginStatus, updateLoginStatus } = useContext(LoginContext);
  const selfLogin =async (googleRes) =>{
    console.log(googleRes)
    let gAuthToken=googleRes.credential
    let token=await fetch(`${import.meta.env.VITE_API_URL}/auth/google`, {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        gAuthToken,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("err");
        return res.json();
      })
      .then((data) => data.data.accessToken)
      .catch((err) => console.log("Erorr in custom login", err));

    updateLoginStatus((prev) => ({
      ...prev,
      loggedIn: true,
      token: token,
      userDetail:null,
      orgDetail:null
    }));
    window.localStorage.setItem("token",token)
  }


  console.log(loginStatus.token)
  return (
    <div>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <h2>Login Happens here</h2>
        <div className="detail">
          <Link to="/">Go Home 🏠</Link>
          <div>{loginStatus.loggedIn?"Logged In":"Logged Out"}</div>
        </div>
        <GoogleLogin
          onSuccess={selfLogin}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default Login;
