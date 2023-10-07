import React, { useEffect, useState } from 'react'
import { styled } from '@mui/system'
import { connect } from 'react-redux'
import './ContentContainer.css'
import Video from './Video'
import * as socketConnection from '../../rtc/socketConnection'
import { getActions } from '../../store/actions/roomActions'
import CodeEditor from './CodeEditor'

const MainContainer = styled('div')({
    width: '100%',
    height: '75%',
    overflowY: 'scroll'
})


function ContentContainer({ chosenStream, roomDetails, setSharedNotepadContent }) {
    const roomId = roomDetails?.roomId || null
    const sharedNotepadContent = roomDetails?.sharedNotepadContent || ''

    const [doUpdate, setDoUpdate] = useState(false)

    const textAreaChangeHandler = (e) => {
        setSharedNotepadContent(e.target.value)
        setDoUpdate(true)
    }
    useEffect(() => {
        const delay = setTimeout(() => {
            if (roomId && doUpdate) {
                socketConnection.changeSharedNotepadcontent({ roomId, sharedNotepadContent })
                setDoUpdate(false)
            }

        }, 200)

        return () => clearTimeout(delay)
    }, [roomId, sharedNotepadContent, doUpdate, setDoUpdate])
    return (
        <MainContainer className='container'>
            {chosenStream ? <Video stream={chosenStream} isLocalStream={true} isChosen={true} autoPlay></Video> : <CodeEditor code={sharedNotepadContent || ''} changeHandler={textAreaChangeHandler} />}
        </MainContainer>
    )
}

const mapStoreStateToProps = ({ room }) => {
    return {
        ...room
    }
}

const mapActionsToProps = dispatch => {
    return {
        ...getActions(dispatch)
    }
}

export default connect(mapStoreStateToProps, mapActionsToProps)(ContentContainer)