import { Button, CircularProgress, FormControl, TextField, Box, Typography } from "@mui/material";
import { Done,Close } from "@mui/icons-material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../../App";
import BannerAlert from "../../../components/BannerAlert";
import fetchBackend from "../../../utils/fetchBackend";

const OrgBadgeCreate = () => {
  const { loginStatus, updateLoginStatus } = useContext(LoginContext);
  const [badgeTitle, updateBadgeTitle] = useState("");
  const [badgeDesc, updateBadgeDesc] = useState("");
  const [badgeTemplate,updateBadgeTemplate]=useState(null)
  const [alertData, updateAlertData] = useState(null);
  const [fileLoad,updateFileLoad] = useState(false)
  const handleUpload = async (e) => {
    updateFileLoad(true)
    updateAlertData(null)
    const files=e.target.files
    const formData = new FormData();
    formData.append("template", files[0]);
    if(files[0].size>=1000*1005){
      updateBadgeTemplate(null);
      updateFileLoad(false);
      updateAlertData({
        type: "error",
        message: "Image should be lesser than 1 MB",
      });
      return
    }
    let fileData=await fetchBackend("org/badge/upload","POST",loginStatus.token,formData,true)
    .catch(err=>{
      console.log("err",err)
      updateBadgeTemplate(null)
      updateFileLoad(false)
      updateAlertData({
        type: "error",
        message: err.message,
      });
    })
    updateBadgeTemplate(fileData.data.file)
    updateFileLoad(false);
  };
  const createBadge = async (e) => {
    // e.preventDefault();
    updateAlertData({
      type: "info",
      message: "Loading...",
    });
    let badgeStatus = await fetchBackend(
      "org/badge/add",
      "POST",
      loginStatus.token,
      {
        title: badgeTitle,
        desc: badgeDesc,
        template: badgeTemplate
      }
    )
      .then((res) => res.data)
      .catch((err) =>
        updateAlertData({
          type: "error",
          message: err.message,
        })
      );
    if (badgeStatus) {
      updateAlertData({
        type: "success",
        message: "Badge created successfully🤩",
      });
    }
  };
  return (
    <div>
      <Typography variant="h5">Create Badge</Typography>
      <Box
        sx={{
          maxWidth: 700,
        }}
      >
        <FormControl fullWidth={true} margin="normal">
          <TextField
            variant="outlined"
            value={badgeTitle}
            onChange={(e) => updateBadgeTitle(e.target.value)}
            label="Title"
          />
        </FormControl>
        <FormControl fullWidth={true} margin="normal">
          <TextField
            variant="outlined"
            value={badgeDesc}
            onChange={(e) => updateBadgeDesc(e.target.value)}
            label="Description"
            multiline={true}
          />
        </FormControl>
        <Box
          sx={{
            mt:3,
            display:"flex",
            alignItems:"center"
          }}
        >

            <Button variant="outlined" component="label" sx={{mr:1}}>
              Upload Template
              <input
                accept="image/*"
                type="file"
                id="template"
                style={{ display: "none" }}
                onChange={handleUpload}
              />
            </Button>
            {fileLoad?<CircularProgress size={24}/>:(
              badgeTemplate?<Done />:<Close />
            )}
            
        </Box>
        <Button
          type="submit"
          sx={{ mt: 3 }}
          variant="contained"
          onClick={createBadge}
        >
          Create
        </Button>

        <BannerAlert status={alertData} />
      </Box>

      <Button sx={{ mt: 2 }} variant="outlined" component={Link} to="../">
        View all badges
      </Button>
    </div>
  );
};

export default OrgBadgeCreate;
