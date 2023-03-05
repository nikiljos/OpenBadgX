import React, { useContext, useEffect } from 'react'
import { LoginContext } from '../App'
import fetchBackend from '../utils/fetchBackend'

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
        console.log("trigXX");
        let detail=await fetchBackend("user/detail","GET",loginStatus.token,null)
        .then(data=>data.data)
        .catch(err=>console.log("Error: ", err))
        console.log(detail)
        detail&&updateLoginStatus(prev=>({
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