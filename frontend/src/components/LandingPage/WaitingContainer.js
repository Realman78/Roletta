import React from 'react'
import { styled } from '@mui/system'
import { Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';


const MainContainer = styled('div')({
    width: '100%',
    height: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 1500
})

function WaitingContainer({roomName, creatorName}) {
  return (
    <MainContainer>
        <Typography sx={{fontSize: '36px', marginBottom: '10%', textAlign: 'center', maxWidth: '90%', height: 'fit-content'}}>
            {roomName}
        </Typography>
 
        <Typography sx={{fontSize: '20px', marginBottom: '20px',  textAlign: 'center', maxWidth: '80%'}}>
            Waiting for {creatorName} to join...
        </Typography>
        <CircularProgress />
    </MainContainer>
  )
}

export default WaitingContainer