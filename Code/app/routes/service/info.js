const express = require('express');
const router = express.Router();
const serviceController = require(`${config.path.controllers}/infoController`)

router.post('/addInformation', serviceController.addInformation.bind(serviceController))
router.get('/getInformation', serviceController.getInformation.bind(serviceController))

module.exports = router