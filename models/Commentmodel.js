const mongoose = require('mongoose')



const commentShema = new mongoose.Schema({
    comment:{
        type:String
    },
    post:{
        type:mongoose.Schema.ObjectId,
        ref:'Post'
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }
})





const Comment = mongoose.model('Comment',commentShema)


module.exports = Comment
