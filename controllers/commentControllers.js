const Comment = require('../models/Commentmodel')
const handleasync = require('../utils/handleAsync')











// ---------------------------- Curd operations ----------------------------
// -------------- get all Comments --------------

exports.getall = async (req,res,next) =>{
  try{
    const comment = await Comment.find().populate('user')
    res.status(200).json({
      status:'success',
      comment
    })
  }catch(err){
    res.status(404).json({
      statu:'comment fail',
      message:err.message
    })
  }
}

// -------------- get one Comment --------------

exports.getone = handleasync.getOne(Comment)


// -------------- create Comment --------------


exports.createComment = async (req,res,next) =>{
    try{
        const Comments = await Comment.create({
            comment:req.body.comment,
            post:req.params.id,
            user:req.user._id,
        })
        res.status(200).json({
            statu:'success',
            data:Comments
        })
    }catch(err){
        res.status(404).json({
            statu:'fail',
            message:err.message
        })
    }
}

// -------------- delete Comment --------------


exports.delete = handleasync.delete(Comment)


// -------------- Update Comment --------------


exports.update = handleasync.update(Comment)

