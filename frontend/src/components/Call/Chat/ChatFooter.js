import React, { useEffect, useRef, useState } from 'react'
import { styled } from '@mui/system'
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'
import { connect } from 'react-redux'
import * as socketConnection from '../../../rtc/socketConnection'
import './Chat.css'
import { useMediaQuery } from 'react-responsive'
import autosize from 'autosize'

const MainContainer = styled('div')({
  width: '100%',
  height: 'fit-content',
  maxHeight: '300px',
  display: 'flex',
  alignItems: 'center'
})

const TextArea = styled('textarea')({
  width: '90%',
  height: '24px',
  fontSize: '18px',
  resize: 'none',
  borderRadius: '8px',
  paddingTop: '3px',
  paddingBottom: '3px',
  paddingLeft: '3px',
  overflowY: 'scroll',
  outline: 'none',
  fontFamily: 'sans-serif'
})

function setNativeValue(element, value) {
  const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
  const prototype = Object.getPrototypeOf(element);
  const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;

  if (valueSetter && valueSetter !== prototypeValueSetter) {
    prototypeValueSetter.call(element, value);
  } else {
    valueSetter.call(element, value);
  }
}

function ChatFooter({ username, userId, roomDetails }) {
  const isMobile = useMediaQuery({ query: '(max-width: 1200px)' })
  const taRef = useRef()
  autosize(taRef.current)

  const [textareaContent, setTextareaContent] = useState('')
  const handleTextAreaChange = e => {
    setTextareaContent(e.target.value)
  }
  const keyDownHandler = e => {
    if (e.code === 'Enter' && !e.ctrlKey) {
      if (textareaContent.trim().length < 1) return
      handleSendMessage()
    } else if (e.code === 'Enter' && e.ctrlKey) {
      setNativeValue(taRef.current, textareaContent+'\n');
      taRef.current.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  const handleSendMessage = () => {
    if (textareaContent.trim().length < 1) return
    socketConnection.sendMessage({
      username,
      userId,
      textareaContent,
      roomId: roomDetails.roomId
    })
    setTextareaContent('')
  }



  useEffect(() => {
    if (textareaContent === '\n') {
      setTextareaContent('')
      taRef.current.style.height = '24px'
    }
  }, [textareaContent, setTextareaContent])

  return (
    <MainContainer>
      <TextArea ref={taRef} style={{ width: isMobile ? '100%' : '90%', maxHeight: '88%' }} className='ta' value={textareaContent} onChange={handleTextAreaChange} onKeyDown={keyDownHandler} placeholder='Type a message...' ></TextArea>
      {!isMobile && <IconButton style={{ width: '10%' }} onClick={handleSendMessage}>
        <SendIcon style={{ color: 'white' }} />
      </IconButton>}
    </MainContainer>
  )
}

const mapStoreStateToProps = ({ auth, room }) => {
  return {
    ...auth,
    ...room
  }
}

export default connect(mapStoreStateToProps)(ChatFooter)