import IconButton from '@mui/material/IconButton'
import ScreenShareIcon from '@mui/icons-material/ScreenShare'
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare'
import * as webRTCHelper from '../../../rtc/webRTCHandler'
import './Buttons.css'
import { Tooltip } from '@mui/material'

const constraints = {
  audio: false,
  video: true
}

function ScreenShareButton({ localStream, screenSharingStream, setScreenSharingStream, isScreenSharingActive }) {
  const handleToggleScreenShare = async () => {
    if (!isScreenSharingActive) {
      let stream = null
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(constraints)
      } catch (e) {
        console.log('Error occured when accessing screen')
      }

      if (stream) {
        setScreenSharingStream(stream)
        webRTCHelper.switchOutgoingTracks(stream)
      }
    } else {
      webRTCHelper.switchOutgoingTracks(localStream)
      screenSharingStream.getTracks().forEach(t => t.stop());
      setScreenSharingStream(null)
    }
  }
  return (
    <Tooltip title={isScreenSharingActive ? 'Stop Sharing Screen' : 'Share Screen'}>
      <IconButton onClick={handleToggleScreenShare} style={{ color: isScreenSharingActive ? 'blue' : 'white' }}>
        {!isScreenSharingActive ? <ScreenShareIcon className='controlButton' /> : <StopScreenShareIcon className='controlButton' />}
      </IconButton>
    </Tooltip>
  )
}

export default ScreenShareButton