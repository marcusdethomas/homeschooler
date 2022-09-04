const Event = require('../models/event.model');

module.exports = { 

    index:(req, res) =>{
        res.json({});
    },
    create:(req, res) =>{
        console.log(req.body);
    Event.create(req.body,
            )  
        .then((add) => {                
            res.json(add);
            console.log("Event was succesfully created.");
        })
        .catch((err) =>{
            console.log(err);
            res.status(400).json(err);
        });
    },
    getSingle:(req, res) =>{
    Event.findById({_id: req.params._id})
        .then((single) => {
            console.log("Single: ", req.body)
            res.json(single);
        })
        .catch((err) =>{
            console.log(err);
            res.json({msg: "Error retrieving event from database", error:err})
        });

    },
    getAll:(req, res) =>{
    Event.find({})
        .then((allEvents) => {
            res.json(allEvents);
        })
        .catch((err) => {
            console.log(err, "Error getting events from database.");
            res.json({msg: "Error gathering events from database.", error:err})
        })
    },
    update:(req, res) =>{
        Event.findByIdAndUpdate({_id: req.params._id},req.body,
        { runValidators: true,})
        .then((updated) => {
            res.json(updated);
        })
        .catch((err) =>{
        console.log(err);
        res.status(400).json(err)
    });},
    delete:(req, res) =>{
        Event.deleteOne({_id: req.params._id})
        .then((destroy) => {
            res.json(destroy);
        })
        .catch((err) =>{
        console.log(err);
        res.json({msg: "Error deleting from database", error:err});
    });}
}