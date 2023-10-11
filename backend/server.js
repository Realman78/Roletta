const express = require('express')
require("dotenv").config()
const cors = require('cors')
const http = require('http')
const PORT = process.env.PORT || 5000
const socketServer = require('./socket')
const connectDB = require('./db')
const app = express()
const server = http.createServer(app)
socketServer.registerSocketServer(server)

const corsOptions = {
    origin: process.env.APP_ORIGIN
}
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(process.env.BUILD_PATH))

app.get('/api/connection', (req,res) => {
    res.send({connection: 'CONNECTED'})
})

const roomRouter = require('./routes/roomRouter')
app.use('/api/room', roomRouter)

const executionRouter = require('./routes/executionRouter')
app.use('/api/execution', executionRouter)

connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`)
    })
}).catch((e) => {
    console.log(e)
})
