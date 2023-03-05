import { useEffect, useState, useContext } from "react";
import fetchBackend from "../../utils/fetchBackend";
import { LoginContext } from "../../App";
import LoginPrompt from "../../components/LoginPrompt";

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
  }, [loginStatus]);

  if (!loginStatus.loggedIn) {
    return <LoginPrompt/>;
  }
  return (
    <div>
      <h3>Your Orgs</h3>
      <div className="org-select">
        {orgList.map((org) => (
          <div className="org-item">
            {org.key} - {org.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrgList;
