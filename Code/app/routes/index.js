const express = require('express')
const router = express.Router()
const infoRouterHandler = require('./service/info')

router.use('/info', infoRouterHandler)

module.exports = router