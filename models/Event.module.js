const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    title: String,
    desc: String, 
    location: String
})

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;