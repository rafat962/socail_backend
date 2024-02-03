const { populate } = require('../models/Commentmodel')
const Post = require('../models/Postmodel')
const handleasync = require('../utils/handleAsync')
const multer = require('multer')






// ---------------------------- Curd operations ----------------------------
// -------------- get all posts --------------

exports.getall = async (req,res,next) =>{
    try{
        const query = {...req.query}
        const removefields = ['field','sort','page','limit']
        for(x of Object.keys(query)){
            if(removefields.includes(x)){
                delete query[x]
            }
        }
        let finalpost = Post.find(query)
        // sort
        if(req.query.sort){
            const sortBy = req.query.sort.replace(',',' ')
            finalpost = finalpost.sort(sortBy)
        }
        // field

        if(req.query.field){
            const sortBy = req.query.field.replace(',',' ')
            finalpost = finalpost.select(sortBy)
        }
        // paginations
        const page = +req.query.page
        const limit = +req.query.limit
        finalpost = finalpost.skip((page-1)*limit).limit(limit)
        console.log(req.user)
        const Posts = await finalpost.populate({
            path: 'user',
            select: 'email'
        }).populate({
          path:'comments',
          populate:{
            path:'user',
            select:'email'
          }
        }
        );
        res.status(200).json({
            status:'success',
            postsNums: Posts.length,
            Posts,
            user_now:req.user
        })
    }catch(err){
        res.status(404).json({
            status:'fail',
            message:err.message
        })
    }
}

// -------------- get one post --------------

exports.getone = handleasync.getOne(Post)


// -------------- create post --------------


exports.createPost = async (req,res,next) =>{
    try{
        const Posts = await Post.create({
            title:req.body.title,
            content:req.body.content,
            image:req.file.filename,
            user:req.user._id
        })
        res.status(200).json({
            statu:'success',
            data:Posts
        })
    }catch(err){
        res.status(404).json({
            statu:'fail',
            message:err.message
        })
    }
}

// -------------- delete post --------------


exports.delete = handleasync.delete(Post)


// -------------- Update post --------------


exports.update = async (req,res,next) =>{
  try{
      const Posts = await Post.findByIdAndUpdate(req.params.id,{
          title:req.body.title,
          content:req.body.content,
          image:req.file.filename,
          user:req.user._id
      })
      res.status(200).json({
          statu:'success',
          data:Posts
      })
  }catch(err){
      res.status(404).json({
          statu:'fail',
          message:err.message
      })
  }
}

// ---------------------------- addtional operations ----------------------------
// -------------- Likes --------------
exports.like = async (req,res,next) =>{
    try{
        const Posts = await Post.findById(req.params.postID)

        Posts.likes+=1
        await Posts.save()
        res.status(200).json({
            statu:'success',
            numOflikes:Posts.likes
        })
    }catch(err){
        res.status(404).json({
            status:"fail",
            message:err.message
        })
    }
}
// -------------- unLikes --------------
exports.unlike = async (req,res,next) =>{
    try{
        const Posts = await Post.findById(req.params.postID)

        Posts.likes-=1
        await Posts.save()
        res.status(200).json({
            statu:'success',
            numOflikes:Posts.likes
        })
    }catch(err){
        res.status(404).json({
            status:"fail",
            message:err.message
        })
    }
}





// -------------- uploadimage --------------

const multerStorage = multer.diskStorage({
  destination:(req,file,cb)=>{
      cb(null,'public/images')
  },
  filename:(req,file,cb)=>{
      const ext = file.mimetype.split('/')[1]
      cb(null,`user-${req.user.id}-${Date.now()}.${ext}`)
  }
})

const multerFilter = (req,file,cb) =>{
  if(file.mimetype.startsWith('image')){
      cb(null,true)
  }else{
      cb(new Error('you cant upload this ext'),false)
  }
}

const upload = multer({
  storage:multerStorage,
  fileFilter:multerFilter
})


exports.uploadimage = async(req,res,next)=>{
  try{
      upload.single('photo')(req,res,async function(err){
          if(err){
              throw new Error(err.message)
          }
          req.photo = req.file.filename
      })
      res.status(200).json({
          status:'success'
      })
  } catch(err){
      res.status(400).json({
          error:'upload image error',
          message:err.message
      })
  }
}
