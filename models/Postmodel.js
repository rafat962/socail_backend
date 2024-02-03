const mongoose = require('mongoose')



const postShema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'you must enter the title of post'],
    },
    content:{
        type:String,
        required:[true,'you must enter the title of post']
    },
    image:String,
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    likes:{
        type:Number,
        default:0}
})
postShema.set('toJSON', { getters: true });
postShema.set('toObject', { getters: true });


postShema.virtual('comments', {
    ref: 'Comment', // The model to use for the relationship
    localField: '_id', // The field in the current model
    foreignField: 'post', // The field in the referenced model
});



const Post = mongoose.model('Post',postShema)


module.exports = Post
