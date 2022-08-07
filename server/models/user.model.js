const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
        firstName:{
            type:String,
            required: [
                true,
                'First Name is required.',
            ],
            minlength:
            [3, 'First must be at least three characters long.'],
        },

        lastName:{
            type:String,
            required: [
                true,'Last Name is required.'
            ],
            
            minlength:
            [3, 'Last Name must be at least three characters long.'],
        },

        password:{
            type:String,
            require:[true, 'Password is required.'],
            minlength:
            [8, 'Password must be at least eight characters long.'],
        },  

        email:{
            type:String,
            required: [
                true,
                'Email is required.'
            ],
            minlength:
            [3, 'Email must be at least three characters long.'],
            validate: {
                validator: val =>/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(val),
                message: "Please enter a valid email"
                }
        },
    },
    {timestamps: true}
);

UserSchema.virtual('confirm')
    .get(() => this._confirm )
    .set(value => this._confirm = value );

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirm) {
        this.invalidate('confirm', 'Passwords must match.');
        console.log("Password: " + this.password);
        console.log("Confirm: " + this.confirm);
    }
    next();
});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10) // 10 defines the salt
        .then(hash => {
        this.password = hash;
        next();
    })
    .catch(err =>{
        console.log("Error saving password hash");
        console.log(err);
    });
});

const User= mongoose.model("User", UserSchema); // must be after UserSchemas
//const test = new User({firstName:'Jack', lastName:'Johnson', email:'GalvestonGiant@BoxingLegends.com', password:'Password'});
console.log(User);
//console.log(test);
//User.create(test); This worked. 

module.exports = User;