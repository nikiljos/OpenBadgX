import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import useBackendData from "../../hooks/useBackendData";

const UserHome = () => {
  const [apiLoad, apiError, userData] = useBackendData(`user/detail`, {
    userDetail: {},
  });

  if (apiError) return <Error message={apiError} />;
  if (apiLoad) return <Loading />;
  return (
    <Box>
      <Box
        sx={{
          mb: 10,
          mt: 5,
        }}
      >
        <Typography variant="h5">Hello, {userData.userDetail.name}</Typography>
        <Typography variant="body1">
          Let's explore the word of badges...
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          "& a": {
            maxWidth: 300,
            mt: 2,
          },
        }}
      >
        <Button component={Link} to="./badge" variant="contained">
          View Recieved Badges
        </Button>
        <Button
          component={Link}
          to={userData.orgLogin ? "../org/home" : "../org"}
          variant="outlined"
        >
          Award Badges
        </Button>

        <Button
          component={Link}
          to="./detail"
          variant="outlined"
        >
          Edit Profile
        </Button>
      </Box>
    </Box>
  );
};

export default UserHome;
