import fetchBackend from "../../utils/fetchBackend";
import { setLocalToken } from "../../utils/localToken";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import useBackendData from "../../hooks/useBackendData";
import { useContext,useState } from "react";
import { LoginContext } from "../../App";
import { Apartment } from "@mui/icons-material";
import { Box, Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import BannerAlert from "../../components/BannerAlert";

const OrgList = () => {
  const { loginStatus, updateLoginStatus } = useContext(LoginContext);
  const [apiLoad,apiError,orgList]=useBackendData(`user/org`,[])
  const [alertData, updateAlertData] = useState(null);

  const navigate = useNavigate();

  if(apiError) return <Error message={apiError}/>
  if(apiLoad) return <Loading/>

  const orgLogin=async(orgId)=>{
    updateAlertData({
      type: "info",
      message: "Loading...",
    });
    let orgToken = await fetchBackend("user/org/login", "POST", loginStatus.token, {
      orgId,
    })
      .then((data) => data.data.accessToken)
      .catch((err) => {
        console.log("Error: ", err)
        updateAlertData({
          type:"error",
          message:"Sorry, Some error occured!"
        })
      });
    
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
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h5">Your Organizations</Typography>
        <Button
          variant="contained"
          onClick={() => navigate("./new")}
          sx={{ m: 3 }}
        >
          Create Org
        </Button>
      </Box>
      <BannerAlert status={alertData} />
      <List>
        {orgList.map((org) => (
          <ListItem
            disablePadding
            onClick={() => orgLogin(org._id)}
            key={org.key}
          >
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
