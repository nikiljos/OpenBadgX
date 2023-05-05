import { Box, Button, Typography } from "@mui/material"
import { Link } from "react-router-dom";
import NotFoundVector from "../assets/img/notfound.svg"

const PageNotFound = () => {
  return (
    <Box sx={{
      textAlign:"center"
    }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
          mt: 5,
        }}
      >
        <Typography variant="h4">Sorry, Page not Found</Typography>
        <img
          src={NotFoundVector}
          alt="Sorry, Page not found"
          style={{
            width:"100%",
            maxWidth: "500px",
            maxHeight: "60vh",
          }}
        />
      </Box>
      <Button component={Link} to="/" variant="contained" sx={{
        m:3
      }}>
        Home
      </Button>
    </Box>
  );
}

export default PageNotFound