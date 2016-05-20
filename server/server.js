var express = require('express'),
    app = express();

/**
 * middleware
 * cors to allow for cross origin requests
 * bodyParser to format data in request body
 */
var cors = require('cors'),
    bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// import the router, which contains the API routes
require('./router.js')(app);

app.listen(3000, function() {
  console.log('listening on port 3000');
})