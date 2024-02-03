const express = require('express')
const commentControllers = require('../controllers/commentControllers')
const Auth = require('../controllers/authControllers')




const Routing = express.Router()


// ---------------------------- Curd operations ----------------------------

Routing.use(Auth.protect)
Routing.route('/').get(commentControllers.getall)
Routing.route('/new-comment/:id').post(commentControllers.createComment)
Routing.route('/:id').get(commentControllers.getone).delete(commentControllers.delete).patch(commentControllers.update)




module.exports = Routing