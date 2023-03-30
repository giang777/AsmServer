const mongoose = require('mongoose');

const Poem = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    img: {
        data:Buffer,
        type: String,
    },
})
module.exports = mongoose.model('user', Poem);