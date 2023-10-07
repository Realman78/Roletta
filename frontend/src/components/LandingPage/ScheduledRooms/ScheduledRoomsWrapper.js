import React from 'react'
import { styled } from '@mui/system'
import { Typography } from '@mui/material'
import ScheduledRooms from './ScheduledRooms'

const MainContainer = styled('div')({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '5%'
})

function ScheduledRoomsWrapper({setShowScheduledRooms}) {
  return (
    <MainContainer>
        <Typography sx={{color: 'white', fontSize: '24px',height: '10%'}}>
            Scheduled Rooms
        </Typography>
        <ScheduledRooms setShowScheduledRooms={setShowScheduledRooms} />
    </MainContainer>
  )
}

export default ScheduledRoomsWrapper