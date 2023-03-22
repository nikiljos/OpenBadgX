import { Box, Typography } from '@mui/material';
import React from 'react'

const AssertionBasicData = ({detail,org}) => {
  return (
    <Box sx={{ mt: 5 }}>
      <Box>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Awarded to
        </Typography>
        {detail&&detail.name}
      </Box>
      <Box>
        <Typography sx={{ fontSize: 14, mt:1 }} color="text.secondary" gutterBottom>
          Awarded by
        </Typography>
        {org&&org.name}
      </Box>
      <Box>
        <Typography sx={{ fontSize: 14, mt:2 }} color="text.secondary" gutterBottom>
          Assertion ID
        </Typography>
        {detail&&detail._id}
      </Box>
    </Box>
  );
}

export default AssertionBasicData