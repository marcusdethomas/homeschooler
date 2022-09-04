const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    const {body} =req;
    try{
        const queryUser = await User.findOne({email: body.email})
            if(queryUser){
                res.status(400).json({error: "Email address is already registered."});
                console.log("First Error Block.")
                return;
            }
        }
        catch (error) {
            console.log("Second Error Block.") // No matter what, this is not being accessed.
            res.status(400).json(error);
    }
    
let newUser = new User(body);
    try{
        const newUserObject = await newUser.save();
        res.json(newUserObject);
    }
    catch(error){
        console.log("Error saving object. ");
        res.status(400).json(error);
        return;
    }
}

const login = async (req, res) => {
    const {body} = req;

    if(!body.email){
        res.status(400).json({error: "Must provide email address."});
        return;
    }
    let userQuery;
    try{
        userQuery =  await User.findOne({email: body.email});
    }
    catch(error){
        res.status(400).json({error: "Email not found."});
    }
    console.log("Query: ", userQuery);

    if(userQuery === null){
        res.status(400).json({error: "Email not found."});
        return;
    }

// Password Verification    
const verifyPassword = bcrypt.compareSync(body.password, userQuery.password);
if(!verifyPassword){
    res.status(400).json({error: "Email and password must match."});
    return;
}
else{
    console.log("Password is valid.");
    res.cookie("usertoken", 
        jwt.sign({
            user_id: userQuery._id,
            firstName: userQuery.firstName,
            lastName: userQuery.lastName
            }, 
            process.env.SECRET_KEY), 
            {
            httpOnly: true,
            expires: new Date(Date.now() + 90000),
            })
            .json({msg: "Successful Login!",
            user_id: userQuery._id ,
            firstName: userQuery.firstName,
            });
}
};

//Logout User
const logout = async (req, res) => {
    res.clearCookie("userToken");
    res.json({message: "Logout Successful."})
    };

const getUser = (req, res) =>{
        User.findById({_id: req.params._id})
            .then((single) => {
                console.log("User: ", req.body)
                res.json(single);
            })
            .catch((err) =>{
                console.log(err);
                res.json({msg: "Error retrieving event from database", error:err})
            });
    
        }
module.exports = {getUser, login, logout, register};
