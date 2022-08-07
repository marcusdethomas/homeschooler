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
var upload = multer({storage: fileStorageEngine});

const { authenticate } = require('../config/auth.config');
const{getUser, login, logout, register} = require("../controller/user.controller");
const events = require("../controller/event.controller");
module.exports = (app) =>{
    app.get("/api/healthcheck",(req, res) => {
        res.json({msg:"Lets get it started!"})
        console.log('Yo yo.')
    });
    // Events
    app.get("/api/events/:_id", events.getSingle);
    app.get("/api/events", events.getAll);
    app.post("/api/createEvent");
    app.post("/api/events", upload.single('image'), events.create);
    app.delete("/api/events/:_id", events.delete); 
    app.put("/api/events/:_id", events.update);

    // Users
    app.post("/api/newuser", register);
    app.post("/api/login", login);
    app.post("/api/logout", logout);
    app.get("/api/users/:_id", getUser );
    /*
    app.post('/api/events', upload.single('image'),  (req, res) => {
        const imagePath = req.file.path
        const description = req.body.description
        events.create;
        console.log("Request file: ", req.file);
        console.log(description, imagePath);
        res.send({description, imagePath});
    })
    */
}