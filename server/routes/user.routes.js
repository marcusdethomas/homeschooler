const{getUser, login, logout, register} = require("../controller/user.controller");

module.exports = (app) =>{
    app.post("/api/newuser", register);
    app.post("/api/login", login);
    app.post("/api/logout", logout);
    app.get("/api/users/:_id", getUser );
}