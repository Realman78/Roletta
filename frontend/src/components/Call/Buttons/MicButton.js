import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import MicIcon from '@mui/icons-material/Mic'
import MicOffIcon from '@mui/icons-material/MicOff'
import './Buttons.css'
import { Tooltip } from '@mui/material'

function MicButton({ localStream }) {
  const [micEnabled, setMicEnabled] = useState(true)

  const handleToggleMic = () => {
    localStream.getAudioTracks()[0].enabled = !micEnabled
    setMicEnabled(!micEnabled)
  }

  return (
    <Tooltip title={micEnabled ? 'Mute' : 'Unmute'}>
      <IconButton onClick={handleToggleMic} style={{ color: micEnabled ? 'white' : 'red' }}>
        {micEnabled ? <MicIcon className='controlButton' /> : <MicOffIcon className='controlButton' />}
      </IconButton>
    </Tooltip>
  )
}

export default MicButton