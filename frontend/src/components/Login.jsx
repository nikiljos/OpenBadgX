import { Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import "./Login.css"

const Login = () => {
  const [token, updateToken]=useState(null)
  const selfLogin = (googleRes) =>{
    console.log(googleRes)
    let gAuthToken=googleRes.credential
    fetch(`${import.meta.env.VITE_API_URL}/auth/google`, {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "gAuthToken":gAuthToken,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("err");
        return res.json();
      })
      .then((data) => {
        updateToken(data.data.accessToken);
      })
      .catch((err) => console.log("Erorr in custom login", err));
  }
  return (
    <div>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <h2>Login Happens here</h2>
        <div className="detail">
          <Link to="/">Go Home 🏠</Link>
          <div>{token?"Logged In":"Logged Out"}</div>
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
