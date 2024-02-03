const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,'you must enter your email'],
        unique: true,
        trim: true,
        lowercase: true,
        validate:{
            validator:validator.isEmail,
            message:'Invalid email format'
        }
    },
    password:{
        type:String,
        required:[true,'you should enter your password'],
        min:1
    },
    confirmPassword:{
        type:String,
        required:[true,'you should enter your password'],
        min:1,
        validate:{
            validator:function(value){
                return value === this.password
            },
            message:'Passwords do not match'
        }
    }
})


userSchema.pre('save',async function(next){
    if(!this.isModified) return next();
    this.password = await bcrypt.hash(this.password,12)
    this.confirmPassword = undefined
    next()
})

userSchema.methods.correctPasswordCompare = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};





const User = mongoose.model('User',userSchema)
module.exports = User

