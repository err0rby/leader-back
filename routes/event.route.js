const {Router} = require('express')
const router = Router()
const {eventController} = require('../controllers/event.controller')

router.get('/event', eventController.getEvent)
router.post('/addEvent', eventController.addEvent)

module.exports = router;