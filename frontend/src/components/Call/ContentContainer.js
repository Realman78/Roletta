import React, { useEffect, useState } from 'react'
import { styled } from '@mui/system'
import { connect } from 'react-redux'
import './ContentContainer.css'
import Video from './Video'
import * as socketConnection from '../../rtc/socketConnection'
import { getActions } from '../../store/actions/roomActions'
import CodeEditor from './CodeEditor'
import { executeCode } from '../../api'

const MainContainer = styled('div')({
    width: '100%',
    height: '75%',
    overflowY: 'scroll',
    position: 'relative'
})


function ContentContainer({ chosenStream, roomDetails, setSharedNotepadContent, language }) {
    const [codeRunning, setCodeRunning] = useState(false);
    const roomId = roomDetails?.roomId || null
    const sharedNotepadContent = roomDetails?.sharedNotepadContent || ''

    const [doUpdate, setDoUpdate] = useState(false)

    const textAreaChangeHandler = (e) => {
        setSharedNotepadContent(e.target.value)
        setDoUpdate(true)
    }

    const executeCodeInEditor = async (e) => {
        const previousCode = roomDetails?.sharedNotepadContent
        setCodeRunning(true)
        const resultFromCodeExecution = await executeCode({ code: roomDetails?.sharedNotepadContent })
        setCodeRunning(false)
        console.log(resultFromCodeExecution)
        if (resultFromCodeExecution?.data?.result) {
            setSharedNotepadContent(`${previousCode}\n\n/*\n\n${resultFromCodeExecution?.data?.result}\n*/`)
        }
        if (resultFromCodeExecution?.data?.error) {
            setSharedNotepadContent(`${previousCode}\n\n/*\n\n${resultFromCodeExecution?.data?.error}\n*/`)
        }
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
            {chosenStream ? <Video stream={chosenStream} isLocalStream={true} isChosen={true} autoPlay></Video> : <CodeEditor code={sharedNotepadContent || ''} changeHandler={textAreaChangeHandler} disabledEditor={codeRunning} />}
            {!chosenStream && language === "js" && roomDetails?.sharedNotepadContent?.length > 0 && <button onClick={executeCodeInEditor} className='button-28' style={{ position: "sticky", bottom: "10px", right: "10px", height: "min-content" }} disabled={codeRunning}>{codeRunning ? "Executing..." : "Execute"}</button>}
        </MainContainer>
    )
}

const mapStoreStateToProps = ({ room, code }) => {
    return {
        ...room,
        ...code
    }
}

const mapActionsToProps = dispatch => {
    return {
        ...getActions(dispatch)
    }
}

export default connect(mapStoreStateToProps, mapActionsToProps)(ContentContainer)