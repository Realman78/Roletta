import React from 'react'
import { styled } from '@mui/system'
import ChatMessagesContainer from './Chat/ChatMessagesContainer'
import ChatFooter from './Chat/ChatFooter'
import { useMediaQuery } from 'react-responsive'

const MainContainer = styled('div')({
    width: '19.5%',
    height: '99.5%',
    display: 'flex',
    // borderLeft: '1px solid white',
    // borderTop: '1px solid white',
    borderTopLeftRadius: '8px',
    flexDirection: 'column',
    backgroundColor: 'rgba(80,80,80)'
})

const TitleContainer = styled('div')({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '4%',
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '15px'
})

function ChatWrapper({isChatHidden}) {
    const isShort = useMediaQuery({ query: '(max-height: 500px)' })

    return (
        <MainContainer style={{display: isChatHidden ? 'none': 'flex'}}>
            {!isShort && <TitleContainer>
                CHAT
            </TitleContainer>}
            <ChatMessagesContainer />
            <ChatFooter />
        </MainContainer>
    )
}

export default ChatWrapper