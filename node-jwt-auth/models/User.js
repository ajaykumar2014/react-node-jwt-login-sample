const mongoose = require('../DB/md-database-connection');

const userScheme = new mongoose.Schema({
    firstname: {
        type: String,
        min: 4,
        max: 255,
        require: true
    },
    lastname: {
        type: String,
        min: 4,
        max: 255,
        require: true
    },
    username: {
        type: String,
        min: 4,
        max: 255,
        require: true
    },
    email: {
        type: String,
        min: 4,
        max: 255,
        require: true
    },
    password: {
        type: String,
        min: 4,
        max: 255,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('User', userScheme);