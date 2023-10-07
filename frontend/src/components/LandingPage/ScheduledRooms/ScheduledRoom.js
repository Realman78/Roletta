import React, { useEffect, useMemo, useState } from 'react'
import { styled } from '@mui/system'
import { Tooltip, Typography } from '@mui/material'
import './ScheduledRooms.css'
import { toast } from 'react-toastify';
import * as roomHandler from '../../../rtc/roomHandler'
import {connect} from 'react-redux'

function convertDateToUTC(date) { return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()); }

const MainContainer = styled('div')({
    width: '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
    padding: '10px',
    paddingBottom: '20px',
    paddingTop: '20px',
    border: '1px solid white',
    borderRadius: '8px',
    position: 'relative'
})

const ExpireContainer = styled('div')({
    position: 'absolute',
    top: '0px',
    left: '10px',
})

function ScheduledRoom({ roomName, roomCode, isPlaceholder, createdAt, creatorName, setShowScheduledRooms, activeRooms }) {
    const [copying, setCopying] = useState(false)
    const creationDate = useMemo(()=>new Date(createdAt.slice(0, -5)), [createdAt])
    const closingDate = useMemo(() => new Date(creationDate.getTime() + 72*60*60*1000), [creationDate])
    const [timeRemaining, setTimeRemaining] = useState(Math.trunc((closingDate.getTime() - convertDateToUTC(new Date()).getTime()) / (1000)).toString())


    useEffect(() => {
        setInterval(() => {
            const date = new Date()
            let temp = Math.trunc((closingDate.getTime() - convertDateToUTC(date).getTime()) / (1000))
            if (temp > 86400){
                setTimeRemaining(Math.trunc(temp/86400) + ` day${temp < 172800 ? '' : 's'} ${temp > 90000 ? `and ${Math.trunc((temp%86400)/3600)} hours` : ''}.`)
            }else if (temp > 3600){
                setTimeRemaining(Math.trunc(temp/3600) + ` hour${temp < 7200 ? '' : 's'}.`)
            }else if (temp > 60){
                setTimeRemaining(Math.trunc(temp/60) + ` minute${temp < 120 ? '' : 's'}.`)
            }else {
                setTimeRemaining('less than a minute.')
            }
        }, 1000)
    }, [setTimeRemaining, closingDate])

    const handleCopyCode = () => {
        navigator.clipboard.writeText(roomCode)
        setCopying(true)
        toast.info('Code copied to clipboard', { autoClose: 1000 })
        setTimeout(() => {
            setCopying(false)
        }, 2000)
    }

    const joinScheduledRoom = () => {
        if (activeRooms.find(r=>r.roomCode === roomCode)){
            roomHandler.joinRoom(roomCode, creatorName)
            setShowScheduledRooms(false)
            return
        }
        roomHandler.createNewRoom(creatorName, roomName, roomCode)
        setShowScheduledRooms(false)
    }
    return (
        <MainContainer>
            <ExpireContainer>
                <Typography sx={{ color: 'red', whiteSpace: 'nowrap', fontSize: '16px', textAlign: 'center' }}>
                    Expires in {timeRemaining}
                </Typography>
            </ExpireContainer>
            <Tooltip title={'Room Name: ' + roomName} >
                <Typography sx={{ color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '38%', fontSize: '20px', textAlign: 'center' }}>
                    {isPlaceholder ? 'Room Name' : roomName}
                </Typography>
            </Tooltip>
            <Tooltip title={copying ? '✔ Copied!' : 'Room Code. Click to copy.'} placement='bottom'>
                <Typography onClick={handleCopyCode} sx={{ color: copying ? 'lightblue' : 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '33%', fontSize: '20px', cursor: 'pointer', textAlign: 'center' }}>
                    {isPlaceholder ? 'Room Code' : roomCode}
                </Typography>
            </Tooltip>
            <button onClick={joinScheduledRoom} className="button-64"><span className="text">Join</span></button>
        </MainContainer>
    )
}

const mapStoreStateToProps = ({room}) => {
    return {
        ...room
    }
}

export default connect(mapStoreStateToProps)(ScheduledRoom)