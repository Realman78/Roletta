import React from 'react'
import IconButton from '@mui/material/IconButton'
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled'
import * as roomHandler from '../../../rtc/roomHandler'
import './Buttons.css'
import { Tooltip } from '@mui/material'

function CloseCallButton() {
  const handleLeaveRoom = () => {
    roomHandler.leaveRoom(true)
  }
  return (
    <Tooltip title={'Hang Up'}>
      <IconButton onClick={handleLeaveRoom} style={{ color: 'white' }}>
        <PhoneDisabledIcon className='closeCallButton' />
      </IconButton>
    </Tooltip>
  )
}

export default CloseCallButton