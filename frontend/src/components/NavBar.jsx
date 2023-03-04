import React, { useContext, useEffect } from 'react'
import { LoginContext } from '../App'

const NavBar = () => {

  const {loginStatus,updateLoginStatus}=useContext(LoginContext)

  //check localStorage for Token
  useEffect(()=>{
    if(!loginStatus.localStorageCheck){   
      let oldToken=window.localStorage.getItem("token")
      if(oldToken&&oldToken!==""){
        updateLoginStatus((prev) => ({
          ...prev,
          localStorageCheck: true,
          loggedIn:true,
          token:oldToken
        }));
      }
    }

    (async ()=>{
      console.log("trig")
      if(loginStatus.loggedIn&&!loginStatus.userDetail){
        let detail = await fetch(`${import.meta.env.VITE_API_URL}/user/detail`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${loginStatus.token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => data.data)
          .catch((err) => console.log("err", err));
        console.log(detail)
        updateLoginStatus(prev=>({
          ...prev,
          userDetail:detail
        }))
      }
    })()
  },[loginStatus])

  return (
    <div>
      <div>OpenBadgX</div>
      {loginStatus.userDetail&&<div className="user-detail">
        <div className="name">{loginStatus.userDetail.name}</div>
        <div className="profile-img">
          <img
            src={loginStatus.userDetail.profileImage}
            alt={loginStatus.userDetail.name}
          />
        </div>
      </div>}
    </div>
  );
}

export default NavBar