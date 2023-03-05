import { useEffect, useState, useContext } from "react";
import fetchBackend from "../../utils/fetchBackend";
import { LoginContext } from "../../App";
import LoginPrompt from "../../components/LoginPrompt";
import "./List.css"
import { setLocalToken } from "../../utils/localToken";
import { Link, useNavigate } from "react-router-dom";

const OrgList = () => {
  const [orgList, updateOrgList] = useState([]);
  const { loginStatus, updateLoginStatus } = useContext(LoginContext);
  const navigate=useNavigate()

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
    
    if(orgToken){
      updateLoginStatus(prev=>({
        ...prev,
        orgLogin:true,
        token:orgToken
      }))
      setLocalToken(orgToken)
      navigate("/org/home")
    }
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
      <Link to="/org/new">Create Org</Link>
    </div>
  );
};

export default OrgList;
