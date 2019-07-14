const express = require('express');
const app = express();
const basicAuth = require('express-basic-auth');
const bodyParser = require('body-parser');
const mongooes = require('mongoose');

// App Initials ///////////////////////////////////////////////////////////////////////////
let port = process.env.port || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Authorization ////////////////////////////////////////////////////////////////////////
app.use(basicAuth({
  authorizer: myAuthorizer,
  unauthorizedResponse: getUnauthorizedResponse
}));
 
function myAuthorizer(username, password) {
    const userMatches = basicAuth.safeCompare(username, 'fhadkhan')
    const passwordMatches = basicAuth.safeCompare(password, 'voilager')
 
    return userMatches & passwordMatches
}

function getUnauthorizedResponse(req) {
  return req.auth
      ? ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected')
      : 'No credentials provided'
}

// Database connect ////////////////////////////////////////////////////////////////////
mongooes.connect('mongodb://localhost:27017/simple-api', {useNewUrlParser: true});


// Routes ////////////////////////////////////////////////////////////////////////////
let indexRoutes = require('./routes/indexRoutes');
let vehicleRoutes = require('./routes/vehicleRoutes');

app.use('/api', indexRoutes, vehicleRoutes);

// Start server
app.listen(port);

console.log(`Server is listening at ${port}`);