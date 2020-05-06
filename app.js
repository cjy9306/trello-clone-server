/* =======================
    LOAD THE DEPENDENCIES
==========================*/
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

/* =======================
    LOAD THE CONFIG
==========================*/
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 5000;

/* =======================
    EXPRESS CONFIGURATION
==========================*/
const app = express();

// cloudflare의 네트워크 속도문제로 우선 https 해제
/*
const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('ssl/private.pem', 'utf8'),
    cert: fs.readFileSync('ssl/crt.pem', 'utf8'),
}
*/
app.use(cors());
// parse JSON and url-encoded query
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configure api router
app.use('/api', require('./api/routes'));

// open the server
// cloudflare의 네트워크 속도문제로 우선 https 해제
/*
https.createServer(options, app).listen(port, () => {
    console.log(`Express is running on port ${port}`);
});
*/
app.listen(port, () => {
    console.log(`Express is running on port ${port}`);
});
