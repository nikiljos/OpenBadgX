import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Loading from '../../../components/Loading';
import Error from '../../../components/Error';
import useBackendData from '../../../hooks/useBackendData';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import BadgeDetailImage from '../../../components/BadgeDetailImage';
import { getS3Url } from '../../../utils/getS3Url';
import BannerAlert from '../../../components/BannerAlert';
import { Image } from '@mui/icons-material';
import fetchBackend from '../../../utils/fetchBackend';
import { LoginContext } from '../../../App';

const OrgBadgeDetail = () => {
  const {id}=useParams()  
  const [apiLoad,apiError,apiData]=useBackendData(`org/badge/${id}/detail`,{})
  const { loginStatus, updateLoginStatus } = useContext(LoginContext);
  const [fileLoad, updateFileLoad] = useState(false);
  const [alertData, updateAlertData] = useState(null);
  const [imgSrc,updateImgSrc]=useState(null)

  useEffect(()=>{
    //change imgSrc based on api data
    updateImgSrc(getS3Url("templates", apiData.template, true))
  },[apiData])

  const handleUpload = async (e) => {
    updateFileLoad(true);
    updateAlertData(null);
    const files = e.target.files;
    if(!files||files.length===0) {
      updateFileLoad(false)
      return;
    }
    const formData = new FormData();
    formData.append("template", files[0]);
    if (files[0].size >= 1000 * 1005) {
      updateFileLoad(false);
      updateAlertData({
        type: "error",
        message: "Image should be lesser than 1 MB",
      });
      return;
    }
    let fileData = await fetchBackend(
      `org/badge/${id}/template`,
      "PUT",
      loginStatus.token,
      formData,
      true
    ).catch((err) => {
      console.log("err", err);
      updateFileLoad(false);
      updateAlertData({
        type: "error",
        message: err.message,
      });
    });
    
    updateFileLoad(false);
    updateImgSrc(getS3Url("templates", fileData.data.template, true))
  };

  if(apiError) return <Error message={apiError}/>
  if(apiLoad) return <Loading/>

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
        className="sm-wrap"
      >
        <Box>
          <Typography variant="h5">{apiData.title}</Typography>
          <Typography variant="body1">{apiData.desc}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <BadgeDetailImage src={imgSrc} />
          <Button
            variant="outlined"
            endIcon={fileLoad ? <CircularProgress size={24} /> : <Image />}
            onClick={handleUpload}
            component="label"
          >
            Change Template
            <input
              accept="image/*"
              type="file"
              id="template"
              style={{ display: "none" }}
              onChange={handleUpload}
            />
          </Button>
          <BannerAlert status={alertData} top={1} sx={{ mt: 2 }} />
        </Box>
      </Box>

      <Box
        sx={{
          mt: 2,
          "& a": {
            mt: 3,
          },
        }}
      >
        <Button
          component={Link}
          variant="contained"
          sx={{ mr: 5 }}
          to="../award"
        >
          Award Badges
        </Button>
        <Button component={Link} variant="outlined" to="../assertions">
          View History
        </Button>
      </Box>
    </div>
  );
}

export default OrgBadgeDetail