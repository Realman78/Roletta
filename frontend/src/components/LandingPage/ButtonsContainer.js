import React, { useState } from 'react'
import './ButtonsContainer.css'
import { useMediaQuery } from 'react-responsive'
import Modal from '../UI/Modal'
import { Typography } from '@mui/material'
import { connect } from 'react-redux'
import { getActions } from '../../store/actions/roomActions'
import CameraDisableButton from './CameraDisableButton'
import * as roomHandler from '../../rtc/roomHandler'
import { toast } from 'react-toastify';
import { testConnection } from '../../api'
import RoomSchedule from './RoomSchedule'
import { styled } from '@mui/system'
import WaitingContainer from './WaitingContainer'

const MainContainer = styled('div')({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: '5%'
})

const ModalContent = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    flexDirection: 'column',
    height: '100%',
    width: '100%'
})

const ModalInputArea = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    width: '100%',
})

const Input = styled('input')({
    fontSize: '1.4rem',
    padding: '5px',
    borderRadius: '8px',
    ':focus': {
        outline: 'none'
    }
})



function ButtonsContainer({ audioOnly, setAudioOnly, scheduleRoom, userId, setScheduledRooms, scheduledRooms, getScheduledRoom, waitingInfo, setWaitingInfo, activeRooms }) {
    const isMobile = useMediaQuery({ query: '(max-width: 1100px)' });
    const [showCreateRoomModal, setShowCreateRoomModal] = useState(false)
    const [showJoinRoomModal, setShowJoinRoomModal] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const [schedulingRoomCode, setSchedulingRoomCode] = useState('')
    const [temp, setTemp] = useState(<></>)

    const [roomName, setRoomName] = useState('')
    const handleRoomNameChange = (e) => {
        setRoomName(e.target.value)
    }

    const [yourName, setYourName] = useState('')
    const handleYourNameChange = (e) => {
        setYourName(e.target.value)
    }

    const [roomCode, setRoomCode] = useState('')
    const handleRoomCodehange = (e) => {
        setRoomCode(e.target.value)
    }

    const toggleShowCreateModal = () => {
        setShowCreateRoomModal(!showCreateRoomModal)
        setRoomName('')
        setYourName('')
        setIsChecked(false)
    }

    const toggleShowJoinModal = () => {
        setShowJoinRoomModal(!showJoinRoomModal)
        setRoomCode('')
        setWaitingInfo(null)
        setYourName('')
        setTemp(<></>)
    }

    const handleAudioOnlyChange = () => {
        setAudioOnly(!audioOnly)
    }

    const createNewRoomHandler = async () => {
        const connected = await testConnection()
        if (connected.data?.connection !== 'CONNECTED') {
            toast.error('Connection to server not established. Reload and try again.', { autoClose: 3000 })
            return
        }
        if (yourName.trim().length > 0 && roomName.trim().length > 0)
            roomHandler.createNewRoom(yourName.trim(), roomName.trim())
        else {
            toast.warn('Please fill in the fields.')
        }
    }
    const handleJoinActiveRoom = async () => {
        const connected = await testConnection()
        if (connected.data?.connection !== 'CONNECTED') {
            toast.error('Connection to server not established. Reload and try again.', { autoClose: 3000 })
            return
        }

        if (yourName.trim().length > 0 && roomCode) {
            //user tries to join a room he scheduled
            if (scheduledRooms.find(r => r.roomCode === roomCode)) {
                if (window.confirm('You are trying to join a room you scheduled. Do you wish to proceed?') === false) return
                if (activeRooms.find(r => r.roomCode === roomCode)) {
                    roomHandler.joinRoom(roomCode, yourName.trim())
                    return
                }
                roomHandler.createNewRoom(yourName.trim(), roomName.trim(), roomCode)
                return
            }

            const found = roomHandler.joinRoom(roomCode, yourName)
            if (!found) {
                const answer = await getScheduledRoom(roomCode)
                if (answer.error) {
                    toast.error(answer.error?.error || answer.error)
                }
                if (answer.data) {
                    setTemp(<WaitingContainer roomName={answer.data.roomName} creatorName={answer.data.creatorName} />)
                    setWaitingInfo({
                        roomCode,
                        yourName: yourName.trim()
                    })
                    return
                }
                toast.error('Room with that code not found.', { autoClose: 3000 })
            }
        } else {
            toast.warn('Please fill in the fields.', { autoClose: 3000 })
        }
    }

    const handleRoomSchedule = async () => {
        if (yourName.trim().length < 1 || roomName.trim().length < 1) return toast.warn('Please fill in the fields.', { autoClose: 3000 })
        const answer = await scheduleRoom({
            roomCode: schedulingRoomCode,
            roomName,
            creatorName: yourName,
            creatorUID: userId
        })
        if (answer.error) {
            toast.error(answer.error?.error || answer.error)
        }
        if (answer.data) {
            setScheduledRooms(answer.data)
            toast.success('Room created successfully. Check your list of scheduled rooms.')
            setShowCreateRoomModal(false)
            setRoomName('')
            setIsChecked(false)
            setYourName('')
        }
    }

    return (
        <MainContainer style={{ flexDirection: isMobile ? 'column' : 'row' }} className='container'>
            <div onClick={setShowCreateRoomModal} className="btn"><p>CREATE ROOM</p></div>
            <div onClick={setShowJoinRoomModal} className="btn"><p>JOIN ROOM</p></div>

            <Modal handleClose={toggleShowCreateModal} show={showCreateRoomModal} isCreate>
                <ModalContent>
                    <ModalInputArea>
                        {!isMobile && <Typography sx={{ fontSize: '1.4rem', color: 'white', textAlign: 'center', marginRight: '20px' }}>
                            Your name
                        </Typography>}
                        <Input value={yourName} onChange={handleYourNameChange} placeholder='Your name...' />
                    </ModalInputArea>
                    <ModalInputArea>
                        {!isMobile && <Typography sx={{ fontSize: '1.4rem', color: 'white', textAlign: 'center', marginRight: '10px' }}>
                            Room name
                        </Typography>}
                        <Input value={roomName} onChange={handleRoomNameChange} placeholder='Room name...' />
                    </ModalInputArea>
                    <RoomSchedule isChecked={isChecked} setIsChecked={setIsChecked} schedulingRoomCode={schedulingRoomCode} setSchedulingRoomCode={setSchedulingRoomCode} />
                    <CameraDisableButton audioOnly={audioOnly} handleAudioOnlyChange={handleAudioOnlyChange} />
                    <button onClick={isChecked ? handleRoomSchedule : createNewRoomHandler} style={{ marginTop: '30px' }} className="glow-on-hover" type="button">{isChecked ? 'SCHEDULE' : 'CREATE'} ROOM!</button>
                </ModalContent>
            </Modal>

            <Modal handleClose={toggleShowJoinModal} show={showJoinRoomModal} isJoin>
                <ModalContent>
                    {waitingInfo ? temp : <>
                        <ModalInputArea>
                            {!isMobile && <Typography sx={{ fontSize: '1.4rem', color: 'white', textAlign: 'center', marginRight: '20px' }}>
                                Your name
                            </Typography>}
                            <Input value={yourName} onChange={handleYourNameChange} placeholder='Your name...' />
                        </ModalInputArea>
                        <ModalInputArea>
                            {!isMobile && <Typography sx={{ fontSize: '1.4rem', color: 'white', textAlign: 'center', marginRight: '10px' }}>
                                Room code
                            </Typography>}
                            <Input value={roomCode} onChange={handleRoomCodehange} placeholder='Room code...' />
                        </ModalInputArea>
                        <CameraDisableButton audioOnly={audioOnly} handleAudioOnlyChange={handleAudioOnlyChange} />
                        <button onClick={handleJoinActiveRoom} style={{ marginTop: '30px' }} className="glow-on-hover" type="button">JOIN A ROOM!</button>
                    </>}
                </ModalContent>
            </Modal>

        </MainContainer>
    )
}

const mapStoreStateToProps = ({ room, auth }) => {
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

export default connect(mapStoreStateToProps, mapActionsToProps)(ButtonsContainer)