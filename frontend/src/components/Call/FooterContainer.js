import React from 'react'
import { styled } from '@mui/system'
import { connect } from 'react-redux'
import Video from './Video'
import ControlsContainer from './ControlsContainer'

const MainContainer = styled('div')({
    display: 'flex',
    width: '100%',
    height: '25%',
    justifyContent: 'center'
})



function FooterContainer({ localStream, remoteStreams, screenSharingStream, roomDetails, username }) {
    return (
        <MainContainer>
            <Video amountOfParticipants={roomDetails?.participants?.length} owner={username} stream={screenSharingStream ? screenSharingStream : localStream} isLocalStream={true} />
            <ControlsContainer />
            {remoteStreams.map((rs, i) => {
                const user = roomDetails?.participants.find(p => p.socketId === rs.connUserSocketId)
                return <Video amountOfParticipants={roomDetails?.participants?.length} owner={user?.name} key={rs.id} stream={rs} isLocalStream={false} />
            })}
        </MainContainer>
    )
}

const mapStoreStateToProps = ({ room, auth }) => {
    return {
        ...room,
        ...auth
    }
}

export default connect(mapStoreStateToProps)(FooterContainer)