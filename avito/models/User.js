const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

let userSchema = new Schema({
    _id: {type: String},
    login: { type: String, require: true, unique: true},
    name: { type: String, require: true},
    number: { type: String, require: true, unique: true, minLength: 10},
    ad_ids: {type: Array, require: false},
    token: {type: String, require: false, unique: true},
    password: { type: String, require: true, minLength: 6},
}, {
    collection : 'test'
    });

userSchema.pre('save', function (next) {
    if(this.password && this.isModified('password')) {
        bcrypt.hash(this.password, 10, (err, hashed) => {
            if (err) return next(err);
            this.password = hashed;
            next();
        });
    } else {
        next();
    }
});

userSchema.methods.checkPassword = function (password, cb) {
    console.log(bcrypt.compareSync(password, this.password));
};

let User = mongoose.model('User', userSchema);

module.exports = User;