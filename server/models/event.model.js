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
    image: {
        type: String
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    },
    {timestamps: true}
);
const Event = mongoose.model("Event", EventSchema);

module.exports = Event;