import { Link } from 'react-router-dom';
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import useBackendData from "../../hooks/useBackendData";
import { Box, Button, Typography } from '@mui/material';

const OrgHome = () => {

  const [apiLoad, apiError, orgData] = useBackendData(`org/detail`, {});

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
          "& a": {
            maxWidth: 300,
            mt: 1.5,
          },
        }}
      >
        <Button component={Link} to="../badge/new" variant="contained">
          Create a Badge
        </Button>
        <Button component={Link} to="../badge" variant="outlined" sx={{mb:3}}>
          View Existing Badges
        </Button>
        <Button component={Link} to="../detail" variant="outlined">
          Edit Org Details
        </Button>
      </Box>
    </Box>
  );
}

export default OrgHome