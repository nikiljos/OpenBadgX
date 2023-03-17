import { useNavigate } from 'react-router-dom';
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import useBackendData from "../../hooks/useBackendData";
import { Box, Button, Typography } from '@mui/material';

const OrgHome = () => {

    const [apiLoad, apiError, orgData] = useBackendData(`org/detail`, {});

  const navigate = useNavigate();
  if (apiError) return <Error message={apiError} />;
  if (apiLoad) return <Loading />;
  return (
    <Box>
      <Box
        sx={{
          mb: 5,
          mt: 5,
        }}
      >
        <Typography variant="h4">{orgData.name}</Typography>

        <Typography variant="body1" sx={{ mt: 3 }}>
          Hi {orgData.name} Admin,
          <br />
          Let's acknowledge more stuff with meaningful badges...
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          "& button": {
            maxWidth: 300,
            mt: 1,
          },
        }}
      >
        <Button onClick={() => navigate("../badge/new")} variant="contained">
          Create a Badge
        </Button>
        <Button onClick={() => navigate("../badge")} variant="outlined">
          View Existing Badges
        </Button>
      </Box>
    </Box>
  );
}

export default OrgHome