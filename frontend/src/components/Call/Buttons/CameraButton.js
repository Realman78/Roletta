import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import VideocamIcon from '@mui/icons-material/Videocam'
import VideocamOffIcon from '@mui/icons-material/VideocamOff'
import './Buttons.css'
import { Tooltip } from '@mui/material'


function CameraButton({ localStream }) {
  const [cameraEnabled, setCameraEnabled] = useState(true)
  const handleToggleCamera = () => {
    localStream.getVideoTracks()[0].enabled = !cameraEnabled
    setCameraEnabled(!cameraEnabled)
  }
  return (
    <Tooltip title={cameraEnabled ? 'Disable Camera' : 'Enable Camera'}>
      <IconButton onClick={handleToggleCamera} style={{ color: cameraEnabled ? 'white' : 'red' }}>
        {cameraEnabled ? <VideocamIcon className='controlButton' /> : <VideocamOffIcon className='controlButton' />}
      </IconButton>
    </Tooltip>
  )
}

export default CameraButton