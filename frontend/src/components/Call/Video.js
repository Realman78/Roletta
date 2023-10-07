import React, { useEffect, useRef, useState } from 'react'
import { styled } from '@mui/system'
import { connect } from 'react-redux'
import { getActions } from '../../store/actions/roomActions'
import { getActionsCode } from '../../store/actions/codeActions'

const MainContainer = styled('div')({
    height: '100%',
    width: '40%',
    backgroundColor: '#202020',
    borderRadius: '8px',
    position: 'relative'
})
const VideoElement = styled('video')({
    height: '100%',
    width: '100%',
    cursor: 'pointer'
})

const NameWrapper = styled('div')({
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.62)',
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
})

const NameTag = styled('p')({
    margin: 0,
    padding: 0,
    fontSize: '16px',
    color: 'white',
})

function Video({ stream, isLocalStream, setChosenStream, isChosen, owner, setShowEditorSettings, amountOfParticipants }) {
    const [showNameTag, setShowNameTag] = useState(false)
    const handleHover = () => {
        setShowNameTag(true)
    }
    const handleMouseLeave = () => {
        setShowNameTag(false)
    }
    const videoRef = useRef()
    useEffect(() => {
        const video = videoRef.current
        video.srcObject = stream

        video.onloadedmetadata = () => {
            video.play()
        }
    }, [stream])

    const handleVideoClick = () => {
        setChosenStream(stream)
        setShowEditorSettings(false)
    }

    let contStyle = {
        width: 'fit-content'
    }
    if (isChosen) {
        contStyle = {
            width: '100%'
        }
    }else if (amountOfParticipants > 2){
        contStyle = {
            width: '20%'
        }
    }
    return (
        <MainContainer style={contStyle}>
            <VideoElement onMouseEnter={handleHover} onMouseLeave={handleMouseLeave} onClick={handleVideoClick} ref={videoRef} autoPlay muted={isLocalStream ? true : false} />
            {showNameTag && <NameWrapper>
                <NameTag>{owner}</NameTag>
            </NameWrapper>}
        </MainContainer>
    )
}

const mapActionsToProps = (dispatch) => {
    return {
        ...getActions(dispatch),
        ...getActionsCode(dispatch)
    }
}

export default connect(null, mapActionsToProps)(Video)