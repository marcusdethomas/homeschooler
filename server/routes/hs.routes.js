const { authenticate } = require('../config/auth.config');
const { hashSync } = require("bcrypt");
const multer = require("multer");
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './images')
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
    // Events
    app.get("/api/events/:_id", events.getSingle);
    app.get("/api/events",authenticate,events.getAll);
    app.post("/api/createEvent",authenticate);
    //app.post("/api/events", authenticate, upload.single('image'), events.create);
    app.delete("/api/events/:_id",authenticate,events.delete, ); 
    app.put("/api/events/:_id",authenticate, events.update);

    // Users
    app.post("/api/newuser", register);
    app.post("/api/login", login);
    app.post("/api/logout", logout);
    app.get("/api/users/:_id", getUser );
    app.post('/api/events', authenticate, upload.single('image'),events.create, (req, res) => {
        const imagePath = req.file
        const description = req.body.description
        console.log(req.file, req.body)
        res.send({description, imagePath});
    })
    
}