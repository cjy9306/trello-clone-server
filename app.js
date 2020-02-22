/* =======================
    LOAD THE DEPENDENCIES
==========================*/
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');

/* =======================
    LOAD THE CONFIG
==========================*/
const config = require('./config/environment')
const port = process.env.PORT || 5000 

/* =======================
    EXPRESS CONFIGURATION
==========================*/
const app = express()

app.use(cors());
// parse JSON and url-encoded query
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// set the secret key variable for jwt
app.set('jwt-secret', config.jwt_key)

// configure api router
app.use('/api', require('./api'))

// open the server
app.listen(port, () => {
    console.log(`Express is running on port ${port}`)
})
