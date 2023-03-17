import { useState,useContext } from 'react'
import fetchBackend from '../../utils/fetchBackend';
import { LoginContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';

const OrgCreate = () => {
  const { loginStatus, updateLoginStatus } = useContext(LoginContext);
  const navigate=useNavigate()
  const [orgName,updateOrgName]=useState("");
  const [orgKey,updateOrgKey]=useState("");
  const [alertData, updateAlertData] = useState(null);
  const createOrg=async (e)=>{
    e.preventDefault();
    updateAlertData({
      type: "info",
      message: "Loading...",
    });
    let orgStatus=await fetchBackend("user/org/add","POST",loginStatus.token,{
      key:orgKey,
      name:orgName
    })
    .then(res=>res.data)
    .catch(err=>updateAlertData({
      type:"error",
      message:err.message
    }))
    if(orgStatus){
      updateAlertData({
        type:"success",
        message:"Org created successfully🤩 Redirecting..."
      })
      updateLoginStatus((prev) => ({
        ...prev,
        orgLogin: true,
        token: orgStatus.accessToken,
        orgDetail: null,
      }));
      setTimeout(()=>navigate("/org/home"),1000);
    }
    
  }
  return (
    <div>
      <h3>Create an organization</h3>
      <form onSubmit={createOrg}>
        <input
          type="text"
          value={orgName}
          onChange={(e) => updateOrgName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          value={orgKey}
          onChange={(e) => updateOrgKey(e.target.value)}
          placeholder="Key"
        />

        <button type="submit">Create Org</button>
      </form>

      {alertData ? (
        <Alert severity={alertData.type} sx={{ mt: 5 }}>
          {alertData.message}
        </Alert>
      ) : (
        ""
      )}
    </div>
  );
}

export default OrgCreate