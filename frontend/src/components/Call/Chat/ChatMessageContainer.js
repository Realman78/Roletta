import React from 'react'
import { styled } from '@mui/system'
import ChatMessage from './ChatMessage'
const MainContainer = styled('div')({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginBottom: '10px',
})

const SystemMessage = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  fontWeight: 'bold',
  wordBreak: 'break-all',
  fontSize: '20px',
})


function ChatMessageContainer({isMine, content, senderName, userId, id, roomId}) {
  const Message = (userId===1308 && senderName === 'System') ? (<SystemMessage>
    {content}
  </SystemMessage>) : <ChatMessage id={id} content={content} senderName={senderName} isMine={isMine} roomId={roomId}/>
  return (
    <MainContainer style={{alignItems: isMine ? 'flex-end' : 'flex-start'}}>
      {Message}
    </MainContainer>
  )
}

export default ChatMessageContainer