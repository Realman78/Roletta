const roomInitializeConnectionHandler = (socket, data)=>{
    const {connUserSocketId} = data
    
    const initData = {connUserSocketId: socket.id}
    socket.to(connUserSocketId).emit('conn-init', initData)

    // roomUpdates.updateRooms()
}

module.exports = roomInitializeConnectionHandler