import React, { useEffect, useRef } from 'react'
import { styled } from '@mui/system'
import {connect} from 'react-redux'
import ChatMessageContainer from './ChatMessageContainer'
import './Chat.css'
import { getActions } from '../../../store/actions/roomActions'


const MainContainer = styled('div')({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'scroll'
})

function ChatMessagesContainer({roomDetails, userId, isChatHidden, setUnreadMessage}) {
  const mainContainer = useRef()
  const chatMessages = roomDetails?.chatMessages
  useEffect(()=>{
    mainContainer.current.scrollTop = mainContainer.current.scrollHeight;
    if (isChatHidden) setUnreadMessage(true)
  }, [mainContainer, chatMessages, setUnreadMessage])
  return (
    <MainContainer ref={mainContainer} className='chatMessagesContainer'>
      {roomDetails?.chatMessages.map(message => <ChatMessageContainer key={message.id} roomId={roomDetails?.roomId} id={message.id} userId={message.userId} isMine={message.userId === userId} content={message.content} senderName={message.senderName}/>)}
    </MainContainer>
  )
}

const mapStoreStateToProps = ({room, auth}) => {
  return {
    ...room,
    ...auth
  }
}

const mapActionsToProps = dispatch => {
  return {
    ...getActions(dispatch)
  }
}

export default connect(mapStoreStateToProps, mapActionsToProps)(ChatMessagesContainer)