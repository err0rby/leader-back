const Event = require('../models/Event.module')

module.exports.eventController = {
    getEvent: async (req, res) => {
        try {
            const data = await Event.find({})
            res.json(data)
        } catch (error) {
            res.json(error)
        }
    },

    addEvent: async (req, res) => {
        const { title, desc, location } = req.body
        try {
            const data = await Event.create({
                title,
                desc,
                location
            })
            res.json(data)
        } catch (error) {
            res.json(error)
        }
    }
}