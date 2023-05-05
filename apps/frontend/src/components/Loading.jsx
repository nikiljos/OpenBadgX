import { LinearProgress } from '@mui/material'
import React from 'react'

const Loading = () => {
  return (
    <div>
      <LinearProgress sx={{
        maxWidth:300,
        m:"20vh auto 0 auto",
      }}/>
    </div>
  )
}

export default Loading