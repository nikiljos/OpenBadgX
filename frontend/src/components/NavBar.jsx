import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../App";
import fetchBackend from "../utils/fetchBackend";
import { getLocalToken } from "../utils/localToken";

const NavBar = () => {
  const { loginStatus, updateLoginStatus } = useContext(LoginContext);

  //check localStorage for Token
  useEffect(() => {
    if (!loginStatus.localStorageCheck) {
      let oldToken = getLocalToken();
      oldToken &&
        updateLoginStatus((prev) => ({
          ...prev,
          localStorageCheck: true,
          loggedIn: true,
          token: oldToken,
        }));
    }

    (async () => {
      if (loginStatus.loggedIn && !loginStatus.userDetail) {
        // console.log("trigXX");
        let detail = await fetchBackend(
          "user/detail",
          "GET",
          loginStatus.token,
          null
        )
          .then((data) => data.data)
          .catch((err) => console.log("Error: ", err));
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
          .catch((err) => console.log("Error: ", err));

        orgDetail &&
          updateLoginStatus((prev) => ({
            ...prev,
            orgDetail,
          }));
      }
    })();
  }, [loginStatus]);

  return (
    <div>
      <div><Link to="/">OpenBadgX</Link></div>
      {loginStatus.userDetail && (
        <div className="user-detail">
          <div className="name">{loginStatus.userDetail.name}</div>
          <div className="profile-img">
            <img
              src={loginStatus.userDetail.profileImage}
              alt={loginStatus.userDetail.name}
            />
          </div>
          <div className="org">
            {(loginStatus.orgDetail && loginStatus.orgDetail.name) ||
              "No Org Selected"}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
