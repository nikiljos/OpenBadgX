import { Alert } from "@mui/material";

const BannerAlert = ({status}) => {
  if(status){
    const validTypes = ["error", "info", "success"];
    if (!validTypes.find(elt=>elt===status.type)) status.type = "info";
    return (
      <Alert severity={status.type} sx={{ mt: 5 }}>
        {status.message}
      </Alert>
    )
  }
  else{
    return null
  }
}

export default BannerAlert