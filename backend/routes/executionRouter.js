const express = require('express')
const router = express.Router()
const {createExecutionRuntime,} = require('../controllers/execution/executionController')

router.post('/', createExecutionRuntime)

module.exports = router