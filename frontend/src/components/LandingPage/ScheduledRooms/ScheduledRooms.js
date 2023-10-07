import React from 'react'
import {connect} from 'react-redux'
import { styled } from '@mui/system'
import ScheduledRoom from './ScheduledRoom'
import { Typography } from '@mui/material'

const MainContainer = styled('div')({
    width: '100%',
    height: '75%',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px'
})

function ScheduledRooms({scheduledRooms, setShowScheduledRooms}) {
  return (
    <MainContainer className='scheduledRoomsContainer'>
        {/* <ScheduledRoom isPlaceholder/> */}
        {scheduledRooms.map(r=><ScheduledRoom setShowScheduledRooms={setShowScheduledRooms} key={r._id} createdAt={r.createdAt} roomName={r.roomName} roomCode={r.roomCode} creatorName={r.creatorName}/>)}
        {scheduledRooms.length < 1 && <Typography sx={{fontSize: '20px', marginTop: '24px', color: 'white'}}>No scheduled rooms.</Typography>}
    </MainContainer>
  )
}

const mapStoreStateToProps = ({room}) => {
    return {
        ...room
    }
}

export default connect(mapStoreStateToProps)(ScheduledRooms)