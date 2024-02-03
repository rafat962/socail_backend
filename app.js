const express = require('express')
const path = require('path')
const postRouts = require('./routes/postRouting')
const userRouts = require('./routes/userRouting')
const cors = require('cors')
const commentRouts = require('./routes/commentRouting')
// ---------------configrations
const app = express()
app.use(express.json())
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(cors())

// --------------- Routing

app.use('/api/v1/post',postRouts)
app.use('/api/v1/user',userRouts)
app.use('/api/v1/comment',commentRouts)





module.exports = app
