import React, { useState } from 'react'
import { styled } from '@mui/system'
import Buttons from './Buttons/Buttons'
import { connect } from 'react-redux'
import { Tooltip, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import NoteIcon from '@mui/icons-material/Note';
import SettingsIcon from '@mui/icons-material/Settings'
import CloseIcon from '@mui/icons-material/Close'
import { getActions } from '../../store/actions/roomActions'
import EditorSettings from './EditorSettings'
import { getActionsCode } from '../../store/actions/codeActions'
import { toast } from 'react-toastify';
import Modal from '../UI/Modal'
import HelpContent from './HelpContent'

const MainContainer = styled('div')({
  display: 'flex',
  width: '30%',
  height: '100%',
  flexDirection: 'column',
  position: 'relative'
})
const TitleContainer = styled('div')({
  width: '100%',
  height: '50%',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
})

const ControlButtonWrapper = styled('div')({
  position: 'absolute',
  top: '0px',
  right: '0px'
})
const HelpButtonWrapper = styled('div')({
  position: 'absolute',
  top: '0px',
  left: '0px'
})


function ControlsContainer({ roomDetails, chosenStream, setChosenStream, showEditorSettings, setShowEditorSettings }) {
  const [copying, setCopying] = useState(false)
  const [showHelp, setShowHelp] = useState(false)

  const handleShowNotepad = () => {
    setChosenStream(null)
  }
  const handleShowHelp = () => {
    setShowHelp(!showHelp)
  }

  const handleShowEditorSettings = () => {
    setShowEditorSettings(!showEditorSettings)
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(roomDetails?.roomCode)
    setCopying(true)
    toast.info('Code copied to clipboard', { autoClose: 1000 })
    setTimeout(() => {
      setCopying(false)
    }, 2000)
  }

  return (
    <MainContainer style={{ width: roomDetails?.participants?.length > 3 ? '20%' : '30%' }}>
      <HelpButtonWrapper>
        <Tooltip title={'I need help!'}>
          <Typography onClick={handleShowHelp} sx={{ color: 'white', marginLeft: '3px', cursor: 'pointer' }}>
            Help
          </Typography>
        </Tooltip>
      </HelpButtonWrapper>
      <Modal show={showHelp} handleClose={handleShowHelp}>
        <HelpContent />
      </Modal>
      {chosenStream ? <ControlButtonWrapper>
        <Tooltip placement={'top'} title={'Show Code Editor'}>
          <IconButton onClick={handleShowNotepad} style={{ color: 'white' }}>
            <NoteIcon />
          </IconButton>
        </Tooltip>
      </ControlButtonWrapper> : <ControlButtonWrapper>
        <Tooltip placement={'top'} title={showEditorSettings ? 'Close Code Editor Settings' : 'Show Code Editor Settings'}>
          <IconButton onClick={handleShowEditorSettings} style={{ zIndex: 2000, color: showEditorSettings ? 'red' : 'white' }}>
            {showEditorSettings ? <CloseIcon className='closeCallButton' /> : <SettingsIcon className='controlButton' />}
          </IconButton>
        </Tooltip>
      </ControlButtonWrapper>}
      {(showEditorSettings && !chosenStream) ? <EditorSettings /> : <>
        <TitleContainer>
          <Tooltip title={'Room Name:' + roomDetails?.roomName} placement={'top'}>
            <Typography sx={{ margin: '0px', marginTop: '20px', fontSize: '20px', color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'center', maxWidth: '80%' }}>
              {roomDetails?.roomName}
            </Typography>
          </Tooltip>
          <Tooltip title={copying ? '✔ Copied Room Code!' : 'Copy Room Code'} placement={'right-end'}>
            <Typography onClick={handleCopyCode} sx={{ cursor: 'pointer', margin: '0px', marginTop: '10px', fontSize: '20px', color: copying ? 'lightblue' : 'white', fontWeight: 'bold' }}>
              Code: {roomDetails?.roomCode}
            </Typography>
          </Tooltip>
        </TitleContainer>
        <Buttons />
      </>}
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
    ...getActions(dispatch),
    ...getActionsCode(dispatch)
  }
}

export default connect(mapStoreStateToProps, mapActionsToProps)(ControlsContainer)