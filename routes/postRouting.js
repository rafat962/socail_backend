const express = require('express')
const postControllers = require('../controllers/postControllers')
const Auth = require('../controllers/authControllers')
const multer = require('multer')



const Routing = express.Router()


// ---------------------------- Images ----------------------------

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
    const destinationPath = 'public/images'

    cb(null, destinationPath);
    },
    filename: (req, file, cb) => {

    const ext = file.mimetype.split('/')[1];
    cb(null, `Post-${Date.now()}.${ext}`);
    },
});
const multerFilter = (req, file, cb) => {

    if (file.mimetype.startsWith('image')) {
    cb(null, true);
    } else {
    cb(new Error('You can\'t upload this extension'), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});





// ---------------------------- Curd operations ----------------------------

Routing.use(Auth.protect)
Routing.route('/').get(postControllers.getall).post(upload.single('image'),postControllers.createPost)
Routing.route('/like/:postID').get(postControllers.like)
Routing.route('/unlike/:postID').get(postControllers.unlike)
Routing.route('/:id').get(postControllers.getone).delete(postControllers.delete).patch(upload.single('image'),postControllers.update)




module.exports = Routing
