import fetchBackend from "../../utils/fetchBackend";
import { setLocalToken } from "../../utils/localToken";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import useBackendData from "../../hooks/useBackendData";
import { useContext } from "react";
import { LoginContext } from "../../App";
import { Apartment } from "@mui/icons-material";
import { Box, Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5">Your Organizations</Typography>
        <Button variant="contained">Create Org</Button>
      </Box>
      <List>
        {orgList.map((org) => (
          <ListItem disablePadding onClick={() => orgLogin(org._id)}>
            <ListItemButton>
              <ListItemIcon>
                <Apartment />
              </ListItemIcon>
              <ListItemText primary={org.name} secondary={org.key} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default OrgList;
