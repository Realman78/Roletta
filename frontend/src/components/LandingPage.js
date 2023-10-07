import React, { useEffect } from 'react'
import { styled } from '@mui/system'
import ContentWrapper from './LandingPage/ContentWrapper'
import { connect } from 'react-redux'
import { getActions } from '../store/actions/authActions'
import { getActions as getActionsRoom } from '../store/actions/roomActions'
import { connectSocket } from '../rtc/socketConnection'
import { randomizer } from '../utils/util'
import { Typography } from '@mui/material'

const MainContainer = styled('div')({
  width: '100%',
  height: '90%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})
const checkRTC = () => {
  try { // or if (webkitRTCPeerConnection) {...}
    var pc = new window.RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });
    if (pc && pc.createDataChannel) {
      var dc = pc.createDataChannel("sendDataChannel", { reliable: false });
      if (dc) {
        return true
      }
    }
  } catch (e) {
    return false
  }
  return false
}

function LandingPage({ setUserId, userId, getScheduledRooms }) {

  useEffect(() => {
    if (!userId) {
      if (localStorage.getItem('UID')) {
        setUserId(localStorage.getItem('UID'))
        return
      }
      const uid = randomizer(6) + (new Date()).getTime()
      setUserId(uid)
      localStorage.setItem('UID', uid)
    }
    if (userId) {
      connectSocket(userId)
      getScheduledRooms(userId)
    }
  }, [setUserId, userId, getScheduledRooms])


  return (
    <MainContainer>
      <ContentWrapper />
      {(!checkRTC()) && <Typography style={{ position: 'absolute', left: '5px', bottom: '5px', cursor: 'pointer', fontSize: '18px', textDecoration: 'underline', color: 'red', fontWeight: 'bold', margin: '0px', marginRight: '3px', padding: '0px' }}>Your browser doesn't support WebRTC. You won't be able to hear or see the other person.</Typography>}
    </MainContainer>
  )
}

const mapActionsToProps = dispatch => {
  return {
    ...getActions(dispatch),
    ...getActionsRoom(dispatch)
  }
}

const mapStoreStateToProps = ({ auth }) => {
  return {
    ...auth
  }
}

export default connect(mapStoreStateToProps, mapActionsToProps)(LandingPage)