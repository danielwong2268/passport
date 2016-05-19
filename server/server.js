var express = require('express'),
    app = express();

/**
 * middleware
 * cors to allow for cross origin requests
 * morgan to log requests
 * bodyParser to format data in request body
 */
var cors = require('cors'),
    morgan = require('morgan'),
    bodyParser = require('body-parser');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

// import the router, which contains the API routes
require('./router.js')(app);

app.listen(3000, function() {
  console.log('listening on port 3000');
})