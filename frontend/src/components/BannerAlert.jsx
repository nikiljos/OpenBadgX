import { Alert } from "@mui/material";

const BannerAlert = ({status}) => {
  if(status)return (
    <Alert severity={status.type} sx={{ mt: 5 }}>
      {status.message}
    </Alert>
  );
  else{
    return null
  }
}

export default BannerAlert