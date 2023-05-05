import { Box, Button, FormControl, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { LoginContext } from '../../App';
import BannerAlert from '../../components/BannerAlert';
import Loading from '../../components/Loading';
import useBackendData from '../../hooks/useBackendData';
import fetchBackend from '../../utils/fetchBackend'

const UserDetailEdit = () => {
  const { loginStatus, updateLoginStatus } = useContext(LoginContext);
  const [alertData, updateAlertData] = useState(null);
  const [apiLoad, apiError, userData] = useBackendData(`user/detail`, null);
  const [name,updateName]=useState("")

  useEffect(()=>{
    updateName(userData?.userDetail?.name||"");
  },[userData])

  const changeDetail=()=>{
    if(!name) {
      updateAlertData({
        type: "error",
        message: "Invalid Name",
      })
      return
    }
    fetchBackend("user/detail","PUT",loginStatus.token,{
      name
    })
    .then(res=>{
      updateAlertData({
        type: "success",
        message: "Updated Sccessfully!",
      })
      updateLoginStatus(prev=>({
        ...prev,
        userDetail:{
          ...prev.userDetail,
          name
        }
      }))
    })
    .catch(err=>{
      updateAlertData({
        type: "error",
        message: err.message,
      })
    })
  }

  if (apiError) return <Error message={apiError} />;
  if (apiLoad) return <Loading />;


  return (
    <Box>
      <Typography variant="h5">Update User Detail</Typography>
      <Box>
        <FormControl fullWidth={true} margin="normal" sx={{
          maxWidth:700
        }}>
          <TextField
            variant="outlined"
            value={name}
            onChange={(e) => updateName(e.target.value)}
            label="Name"
          />
        </FormControl>
        <Box sx={{
          mt:2
        }}>
          <Button variant="contained" onClick={changeDetail} sx={{ mr: 3 }}>
            Update
          </Button>
          <Button variant="outlined" component={Link} to="/me">
            Back
          </Button>
        </Box>
      </Box>
      <BannerAlert status={alertData}/>
    </Box>
  );
}

export default UserDetailEdit