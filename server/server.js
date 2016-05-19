var express = require('express');
var app = express();

// middleware
var morgan = require('morgan');
var bodyParser = require('body-parser');

app.use(morgan('combined'));
app.use(bodyParser.json());

// import the router, which contains the API routes
require('./router.js')(app);

app.listen(3000, function() {
  console.log('listening on port 3000');
})