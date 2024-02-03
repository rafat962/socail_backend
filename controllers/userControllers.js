const User = require('../models/usermodel')
const handle = require('../utils/handleAsync')
const jwt = require('jsonwebtoken')





// ---------------------------- Curd operations ----------------------------
// -------------- get all Users --------------

exports.getall = handle.getAll(User)

// -------------- get one User --------------

exports.getone = handle.getOne(User)


// -------------- create User --------------


exports.createUser = handle.create(User)

// -------------- delete User --------------


exports.delete = handle.delete(User)


// -------------- Update User --------------


exports.update = handle.update(User)





// -------------- get me --------------
