const mongoose = require('mongoose'); 

const assignmentSchema = new mongoose.Schema({
    userId:{
        type: String,
        require: true
    },
    title:{
        type: String,
        require: true
    },
    subject:{
        type: String,
        require: true
    },
    due:{
        type: Date,
        require: true
    },
    completed:{
        type: Boolean,
        require: true,
        default: false
    },
    doubts:{
        type: String,
        require: false
    }
})

module.exports = mongoose.model('Assignment', assignmentSchema);