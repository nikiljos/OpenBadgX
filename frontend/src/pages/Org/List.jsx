import { useEffect, useState, useContext } from "react";
import fetchBackend from "../../utils/fetchBackend";
import { LoginContext } from "../../App";
import LoginPrompt from "../../components/LoginPrompt";
import "./List.css"
import { setLocalToken } from "../../utils/localToken";

const OrgList = () => {
  const [orgList, updateOrgList] = useState([]);
  const { loginStatus, updateLoginStatus } = useContext(LoginContext);

  useEffect(() => {
    if (loginStatus.loggedIn) {
      (async () => {
        let orgListRes = await fetchBackend(
          "org",
          "GET",
          loginStatus.token,
          null
        )
          .then((data) => data.data)
          .catch((err) => console.log(err));
        updateOrgList(orgListRes);
      })();
    }
  }, [loginStatus.loggedIn]);

  const orgLogin=async(orgId)=>{
    let orgToken = await fetchBackend("org/login", "POST", loginStatus.token, {
      orgId,
    })
      .then((data) => data.data.accessToken)
      .catch((err) => console.log("Error: ", err));
    
    orgToken&&updateLoginStatus(prev=>({
      ...prev,
      orgLogin:true,
      token:orgToken
    }))
    orgToken&&setLocalToken(orgToken)
  }

  if (!loginStatus.loggedIn) {
    return <LoginPrompt/>;
  }
  return (
    <div>
      <h3>Your Orgs</h3>
      <div className="org-select">
        {orgList.map((org) => (
          <div className="org-item" key={org.key} onClick={()=>orgLogin(org._id)}>
            {org.key} - {org.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrgList;
