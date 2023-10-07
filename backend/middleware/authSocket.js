const verifyTokenSocket = (socket, next) => {
    const userId = socket.handshake.auth?.uid

    socket.user = userId

    next()
}

module.exports = verifyTokenSocket