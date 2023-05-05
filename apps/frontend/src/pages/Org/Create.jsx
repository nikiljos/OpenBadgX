import { useState,useContext } from 'react'
import fetchBackend from '../../utils/fetchBackend';
import { LoginContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import BannerAlert from '../../components/BannerAlert';
import { Box, Button, FormControl, TextField, Typography } from '@mui/material';

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
      <Typography variant="h5">Create Organization</Typography>
      <Box sx={{
          maxWidth: 700,
        }}
      >
        <FormControl fullWidth={true} margin="normal">
          <TextField
            variant="outlined"
            value={orgName}
            onChange={(e) => updateOrgName(e.target.value)}
            label="Organizaton Name"
          />
        </FormControl>
        <FormControl fullWidth={true} margin="normal">
          <TextField
            variant="outlined"
            value={orgKey}
            onChange={(e) => updateOrgKey(e.target.value)}
            label="Unique Org ID"
          />
        </FormControl>

        <Button
          type="submit"
          sx={{ mt: 3 }}
          variant="contained"
          onClick={createOrg}
        >
          Create
        </Button>

        <BannerAlert status={alertData} />
      </Box>
    </div>
  );
}

export default OrgCreate