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

app.use(cors());
// parse JSON and url-encoded query
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configure api router
app.use('/api', require('./api/routes'));

// open the server
app.listen(port, () => {
	console.log(`Express is running on port ${port}`);
});
