import { Box, Typography } from '@mui/material';
import React from 'react'

const AssertionBasicData = ({detail}) => {
  return (
    <Box sx={{ mt: 5 }}>
      <Box>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Awarded to
        </Typography>
        {detail.name}
      </Box>
      <Box>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Assertion ID
        </Typography>
        {detail._id}
      </Box>
    </Box>
  );
}

export default AssertionBasicData