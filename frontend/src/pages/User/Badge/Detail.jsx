import React from 'react'
import { Link, useParams } from 'react-router-dom';
import Loading from '../../../components/Loading';
import Error from '../../../components/Error';
import useBackendData from '../../../hooks/useBackendData';
import { Box, Button, Typography } from '@mui/material';
import { OpenInNew } from '@mui/icons-material';
import BadgeDetailImage from '../../../components/BadgeDetailImage';
import AssertionBasicData from '../../../components/AssertionBasicData';
import { getS3Url } from '../../../utils/getS3Url';

const UserBadgeDetail = () => {
  const {id}=useParams()  
  console.log(id)
  const [apiLoad, apiError, badgeData] = useBackendData(`detail/${id}`, {
    assertions:[{}],
  });

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
          <Typography variant="h5">{badgeData.title}</Typography>
          <Typography variant="body1">{badgeData.desc}</Typography>
          <AssertionBasicData
            detail={badgeData.assertions[0]}
            org={badgeData.org}
          />
        </Box>
        <BadgeDetailImage
          src={
            badgeData.template
              ? getS3Url("templates", badgeData.template)
              : "/img/thumbnail.jpg"
          }
        />
      </Box>

      <Box
        sx={{
          mt: 2,
        }}
      >
        <Button
          component={Link}
          to={`/badge/${badgeData.assertions[0]._id}`}
          sx={{ mr: 5 }}
          target="_blank"
          endIcon={<OpenInNew />}
        >
          Public Verification Page
        </Button>
      </Box>
    </div>
  );
}

export default UserBadgeDetail