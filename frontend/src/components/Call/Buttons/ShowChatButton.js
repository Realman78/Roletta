import IconButton from '@mui/material/IconButton'
import CommentIcon from '@mui/icons-material/Comment'
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled'
import './Buttons.css'
import { styled } from '@mui/system'
import { Tooltip } from '@mui/material'

const Notification = styled('button')({
    position: 'absolute',
    top: '3px',
    right: '3px',
    width: '12px',
    height: '12px',
    backgroundColor: 'red',
    borderRadius: '50%',
    padding: 0,
    margin: 0,
    border: 'none',
    pointerEvents: 'none'
})

function ScreenShareButton({ setUnreadMessage, isUnread, isChatHidden, setIsChatHidden }) {
    const handleToggleChat = async () => {
        setIsChatHidden(!isChatHidden)
        if (isUnread)
            setUnreadMessage(false)
    }
    return (
        <Tooltip title={isChatHidden ? 'Show Chat' : 'Hide Chat'}>
            <IconButton onClick={handleToggleChat} style={{ color: 'white', position: 'relative' }}>
                {isChatHidden ? <CommentIcon className='controlButton' /> : <CommentsDisabledIcon className='controlButton' />}
                {(isUnread && isChatHidden) && <Notification />}
            </IconButton>
        </Tooltip>
    )
}

export default ScreenShareButton