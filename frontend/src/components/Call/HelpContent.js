import React from 'react'
import { styled } from '@mui/system'


const MainContainer = styled('div')({
  width: '90%',
  height: '90%',
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '12px',
  marginTop: '5%',
  color: 'white',
  overflow: 'auto'
})
function HelpContent() {
  return (
    <MainContainer className='scheduledRoomsContainer'>
        <h1>HELP</h1>
        <h3>1. I dont see the other person!</h3>
        <p>Make sure the other person has his camera turned on. You can communicate through chat or through the shared code editor.</p>
        <p>If the other person has his camera turned on, then you need to check your extensions. Usually VPN extensions cause a problem, check for WebRTC extensions also.</p>
        <p>If your extensions don't pose a problem, go back to the main site and in the bottom left corner you may see a red text. If you don't see that text then it is ok.</p>
        <p>If nothing helps, try another browser.</p>
        <br />
        <p>If something else doesn't work, please submit an e-mail to marin.dedic@me.com</p>
    </MainContainer>
  )
}

export default HelpContent