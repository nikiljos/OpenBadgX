import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ErrorVector from "../assets/img/error.svg";

const Error = (props) => (
  <Box
    sx={{
      textAlign: "center",
    }}
  >
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        mt: 5,
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4">Sorry, some error occured!</Typography>
        <Typography variant="body1">{props.message}</Typography>
      </Box>

      <img
        src={ErrorVector}
        alt="Sorry, Some error occured!"
        style={{
          width:"100%",
          maxWidth: "500px",
          maxHeight: "60vh",
        }}
      />
    </Box>
    <Button
      component={Link}
      to="/"
      variant="contained"
      sx={{
        m: 3,
      }}
    >
      Home
    </Button>
  </Box>
);

export default Error;
