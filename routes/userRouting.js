const express = require('express')
const userControllers = require('../controllers/userControllers')
const AuthControllers = require('../controllers/authControllers')




const Routing = express.Router()


// ---------------------------- AUTH ----------------------------

Routing.route('/login').post(AuthControllers.login)
Routing.route('/signup').post(AuthControllers.signUp)






// ---------------------------- Curd operations ----------------------------
Routing.use(AuthControllers.protect)
Routing.route('/').get(userControllers.getall).post(userControllers.createUser)
Routing.route('/:id').get(userControllers.getone).delete(userControllers.delete).patch(userControllers.update)




module.exports = Routing