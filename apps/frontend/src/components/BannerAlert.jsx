import { Alert } from "@mui/material";

const BannerAlert = ({status,top}) => {
  if(status){
    const validTypes = ["error", "info", "success"];
    if (!validTypes.find(elt=>elt===status.type)) status.type = "info";
    return (
      <Alert severity={status.type} sx={{ mt: top??5 }}>
        {status.message}
      </Alert>
    )
  }
  else{
    return null
  }
}

export default BannerAlert