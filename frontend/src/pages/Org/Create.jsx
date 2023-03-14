import { useState,useContext } from 'react'
import fetchBackend from '../../utils/fetchBackend';
import { LoginContext } from '../../App';
import { useNavigate } from 'react-router-dom';

const OrgCreate = () => {
  const { loginStatus, updateLoginStatus } = useContext(LoginContext);
  const navigate=useNavigate()
  const [orgName,updateOrgName]=useState("");
  const [orgKey,updateOrgKey]=useState("");
  const [apiResponse,updateApiResponse]=useState({
    status:null,
    message:null
  })
  const createOrg=async (e)=>{
    e.preventDefault();
    updateApiResponse({
      status:"load",
      message:"Loading..."
    })
    let orgStatus=await fetchBackend("user/org/add","POST",loginStatus.token,{
      key:orgKey,
      name:orgName
    })
    .then(res=>res.data)
    .catch(err=>updateApiResponse({
      status:"error",
      message:err.message
    }))
    if(orgStatus){
      updateApiResponse({
        status:"success",
        message:"Org created successfully🤩 Redirecting..."
      })
      updateLoginStatus(prev=>({
        ...prev,
        orgLogin:true,
        token:orgStatus.accessToken
      }))
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

        <button type='submit'>Create Org</button>
      </form>
      {apiResponse.status&&( <div>
        {apiResponse.message}
      </div> )}
    </div>
  );
}

export default OrgCreate