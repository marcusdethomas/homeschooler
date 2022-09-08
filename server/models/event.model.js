const mongoose = require('mongoose');
const EventSchema = new mongoose.Schema({
    title:{
        type:String,
        required: [
            true,
            'Title is required.'
        ]
    },
    details:{
        type:String,
        required: [
            true,
            'Details are required.'
        ]
    },
    tag:{
        type:String,
        required: [
            true,
            'Tag is required'
        ]
    },
    image: {
        type: String
    },
    imageLocation:
        [],
    // Still have to work on this
    createdBy:{
        type:String
    },
    },
    {timestamps: true}
);
const Event = mongoose.model("Event", EventSchema);

module.exports = Event;