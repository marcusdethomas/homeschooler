const { authenticate } = require('../config/auth.config');
const { hashSync } = require("bcrypt");
const multer = require("multer");
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './images/')
    },
    filename:(req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname)
    }
}) 
const upload = multer({storage: fileStorageEngine});

const{getUser, login, logout, register} = require("../controller/user.controller");
const events = require("../controller/event.controller");
module.exports = (app) =>{
    app.get("/api/healthcheck",(req, res) => {
        res.json({msg:"Lets get it started!"})
        console.log('Yo yo.')
    });

    app.get("/api/events/:_id", events.getSingle);
    app.get("/api/events",authenticate,events.getAll);
    app.post("/api/createEvent",authenticate);
    app.delete("/api/events/:_id",authenticate,events.delete, ); 
    app.put("/api/events/:_id",authenticate, events.update);
    app.post('/api/events', authenticate, upload.array('image'),events.create, (req, res) => {
        const imagePath = req.file
        const description = req.body.description
        console.log(req.file, req.body)
        res.send({description, imagePath});
    })
    
}