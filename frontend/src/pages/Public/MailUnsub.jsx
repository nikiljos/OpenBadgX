import { Box, Button, Typography } from "@mui/material"
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import BannerAlert from "../../components/BannerAlert";
import fetchBackend from "../../utils/fetchBackend";
import unsubImg from "../../../assets/img/unsub.svg"

const MailUnsub = () => {
  const [searchParams]=useSearchParams()
  const [alertData, updateAlertData] = useState(null);
  const confirmUnsub=()=>{
    const secret=searchParams.get("secret")
    console.log(secret)
    if(!secret||secret===""){
      updateAlertData({
        type:"error",
        message:"Invalid Secret"
      })
      return
    }
    fetchBackend("mail/unsubscribe","POST",null,{
      secret
    })
    .then(res=>{
      updateAlertData({
        type: "success",
        message: res.message,
      });
    })
    .catch(err=>{
      updateAlertData({
        type: "error",
        message: err.message,
      });
    })
  }
  return (
    <Box sx={{
      display:"flex",
      flexDirection:"column",
      alignItems:"center"
    }}>
      <img src={unsubImg} alt="unsubscribe" style={{
        maxWidth:400,
        maxHeight:"35vh"
      }}/>
      <Box sx={{
        my:3,
        textAlign:"center"
      }}>
        <Typography variant="h5">We're sad to see you go 🥲</Typography>
        <Typography variant="body1">Click on the button to confirm unsubscription.</Typography>
      </Box>

      <Button variant="contained" fullWidth={false} onClick={confirmUnsub}>
        Unsubscribe
      </Button>
      <BannerAlert status={alertData}/>
    </Box>
  );
}

export default MailUnsub