import React, { useState } from 'react'
import { styled } from '@mui/system'
import { IconButton, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import * as socketConnection from '../../../rtc/socketConnection'

const MainContainer = styled('div')({
  width: '80%',
  minWidth: '10%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  backgroundColor: 'rgb(111,111,230)',
  color: 'white',
  borderRadius: '8px',
  wordBreak: 'break-word',
  fontSize: '18px',
  paddingRight: '10px',
  paddingLeft: '10px',
  paddingBottom: '10px'
})
const HeaderContainer = styled('div')({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  marginBottom: '5px',
  fontStyle: 'italic',
  color: 'rgb(230,230,230)'
})
function ChatMessage({ isMine, content, senderName, id, roomId }) {
  const [showBin, setShowBin] = useState(false)
  let hs = { justifyContent: isMine ? 'flex-end' : 'flex-start' }
  if (showBin && isMine) {
    hs = { justifyContent: isMine ? 'space-between' : 'flex-start' }
  }

  const deleteMessagehandler = () => {
    socketConnection.deleteMessage({ messageId: id, roomId })
  }

  return (
    <MainContainer onMouseEnter={() => setShowBin(true)} onMouseLeave={() => setShowBin(false)} style={{ backgroundColor: isMine ? 'rgb(111,111,230)' : 'gray', marginLeft: isMine ? '0px' : '3px', borderBottomLeftRadius: isMine ? '8px' : '0px', borderBottomRightRadius: !isMine ? '8px' : '0px', }}>
      <HeaderContainer style={hs}>
        <Tooltip title={'Delete message'} placement={'right'}>
          <IconButton onClick={deleteMessagehandler} style={{ color: 'red', display: (showBin && isMine) ? 'block' : 'none', padding: 0, margin: 0 }}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        {senderName}
      </HeaderContainer>
      {content.split('\n').map((item, key) => <span key={key}>{item}<br /></span>)}
    </MainContainer>
  )
}

export default ChatMessage