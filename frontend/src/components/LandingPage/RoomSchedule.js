import { Checkbox, FormControlLabel, Tooltip, Typography } from '@mui/material'
import { styled } from '@mui/system'
import React, { useState } from 'react'
import { randomizer } from '../../utils/util'
import { toast } from 'react-toastify';

const MainContainer = styled('div')({
    width: '65%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '16px'
})

const InfoWrapper = styled('div')({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
    // justifyContent: 'center'
})

const Up = styled('div')({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px'
    // justifyContent: 'center'
})

function RoomSchedule({ isChecked, setIsChecked, schedulingRoomCode, setSchedulingRoomCode }) {
    const [copying, setCopying] = useState(false)

    const handleCheckbox = e => {
        setIsChecked(!isChecked)
        setSchedulingRoomCode(randomizer(8))
    }
    const handleCopyCode = () => {
        navigator.clipboard.writeText(schedulingRoomCode)
        setCopying(true)
        toast.info('Code copied to clipboard', { autoClose: 1000 })
        setTimeout(() => {
            setCopying(false)
        }, 2000)
    }
    return (
        <MainContainer>
            <FormControlLabel style={{ width: 'fit-content' }} control={<Checkbox onChange={handleCheckbox} checked={isChecked} />} label="Schedule Room" />
            {isChecked && <InfoWrapper>
                <Up>
                    <Typography >
                        ROOM CODE:
                    </Typography>
                    <Tooltip title={copying ? '✔ Copied!' : 'Click to copy room code'} placement='top'>
                        <Typography onClick={handleCopyCode} sx={{ fontSize: '24px', marginLeft: '10px', cursor: 'pointer', color: copying ? 'lightblue' : 'white' }}>
                            {schedulingRoomCode}
                        </Typography>
                    </Tooltip>
                </Up>
                <Typography sx={{ fontSize: '12px' }}>
                    *Room will be closed automatically after 72 hours OR when the last person in that room leaves.
                </Typography>
            </InfoWrapper>}
        </MainContainer>
    )
}

export default RoomSchedule