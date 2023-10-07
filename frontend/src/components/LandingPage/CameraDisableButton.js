import React from 'react'
import { styled } from '@mui/system'
import IconButton from '@mui/material/IconButton'
import VideocamIcon from '@mui/icons-material/Videocam'
import VideocamOffIcon from '@mui/icons-material/VideocamOff'

const MainContainer = styled('div')({
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
})
function CameraDisableButton({audioOnly, handleAudioOnlyChange}) {
    return (
        <MainContainer>
            <IconButton style={{width: '100%', color: audioOnly ? 'rgb(255, 0, 106)' : 'rgb(30, 200, 130)', fontSize: '1rem', background: 'rgba(200,200,200, 0.1)', borderRadius: '8px'}} onClick={handleAudioOnlyChange}>{!audioOnly ? <VideocamIcon /> : <VideocamOffIcon />}{audioOnly ? 'Camera disabled' : 'Camera enabled'}</IconButton>
        </MainContainer>
    )
}

export default CameraDisableButton