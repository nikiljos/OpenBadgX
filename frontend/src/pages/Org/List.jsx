import fetchBackend from "../../utils/fetchBackend";
import "./List.css"
import { setLocalToken } from "../../utils/localToken";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import useBackendData from "../../hooks/useBackendData";
import { useContext } from "react";
import { LoginContext } from "../../App";

const OrgList = () => {
  const { loginStatus, updateLoginStatus } = useContext(LoginContext);
  const [apiLoad,apiError,orgList]=useBackendData(`user/org`,[])

  const navigate = useNavigate();

  if(apiError) return <Error message={apiError}/>
  if(apiLoad) return <Loading/>

  const orgLogin=async(orgId)=>{
    let orgToken = await fetchBackend("user/org/login", "POST", loginStatus.token, {
      orgId,
    })
      .then((data) => data.data.accessToken)
      .catch((err) => console.log("Error: ", err));
    
    if(orgToken){
      updateLoginStatus(prev=>({
        ...prev,
        orgLogin:true,
        token:orgToken,
        orgDetail:null
      }))
      setLocalToken(orgToken)
      navigate("/org/home")
    }
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
