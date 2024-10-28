const mongoose = require('mongoose'); 

const testSchema = new mongoose.Schema({
    userId:{
        type: String,
        require: true
    },
    topic:{
        type: String,
        require: true
    },
    subject:{
        type: String,
        require: true
    },
    testDate:{
        type: Date,
        require: true
    },
    completed:{
        type: Boolean,
        require: true,
        default: false
    }
})

module.exports = mongoose.model('Test', testSchema);