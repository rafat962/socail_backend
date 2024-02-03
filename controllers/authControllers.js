const User = require('../models/usermodel')
const jwt = require('jsonwebtoken')



const sign = (userid)=>{
    const token = jwt.sign({id:userid},'rafat',{expiresIn:'3h'})
    return token
}





//----------------- PROTECT -----------------




exports.protect = async (req,res,next)=>{
    try{

        if(!req.headers.authorization){
            throw 'You should enter your credintial'
        }

        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token,'rafat')
        if(!decoded){
            throw 'there is no user with this credintial'
        }
        const user = await User.findById(decoded.id)
        req.user = user
        next()
    }catch(err){
        res.status(404).json({
            statu:'fail',
            message:err.message
        })
    }
}

//----------------- LOGIN -----------------
exports.login = async (req,res,next) =>{
    try{
        const user = await User.findOne({email:req.body.email})
        // validate if user exsist
        if(!user){
            throw 'There is no user with that email adderss'
        }
        // validate passwoed
        const passwordCheck = await  user.correctPasswordCompare(req.body.password)
        if(!passwordCheck){
            throw 'INVALID PASSWORD'
        }
        // return token
        const token = sign(user._id)
        //--------------------------
        res.status(200).json({
            status:'success',
            token
        })
    }catch(err){
        res.status(401).json({
            status:'fail',
            message:err
        })
    }
}

//----------------- SIGNUP -----------------
exports.signUp = async (req,res,next) =>{
    try{
        const newuser = await User.create({
            email: req.body.email,
            password: req.body.password,
            confirmPassword:req.body.confirmPassword
        })
        const token = sign(newuser._id)

        //--------------------------
        res.status(200).json({
            status:'success',
            token
        })
    }catch(err){
        if(err.message.split(' ')[0] === 'E11000'){
            res.status(401).json({
                status:'fail',
                message:'dublicated email'
            })
        }else{
            res.status(401).json({
                status:'fail',
                message:err.message
            })
        }
    }
}








