const express = require('express');
const basicAuth = require('express-basic-auth');
const app = express();
const bodyParser = require('body-parser');
const mongooes = require('mongoose');
let Vehicle = require('./models/vehicle');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let router = express.Router();

let port = process.env.port || 3000;

// Database connect
mongooes.connect('mongodb://localhost:27017/simple-api', {useNewUrlParser: true});

// Authorization
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

// Base route
app.use('/api', router);

// Route middleware
// router.use((req, res, next) => {
//   if (!req.headers.authorization) {
//     return res.status(403).json({ error: 'No credentials sent!' });
//   }
//   console.log('FYI...... Some process is happening.');
//   next();
// });

// Routes definition
router.all('/', (req, res) => {
  res.json({message: 'Welcome to our API.'});
});

router.route('/vehicle')
.post((req, res) => {
  let vehicle = new Vehicle();
  vehicle.name = req.body.name;
  vehicle.year = req.body.year;
  vehicle.price = req.body.price;
  vehicle.save((err) => {
    if(err) res.send(err);
    else res.json({message: 'New vehicle added to database.'});
  });
})
.get((req, res) => {
  Vehicle.find((err, vehicles) => {
    if(err) res.send(err);
    else res.json(vehicles);
  });
});

router.route('/vehicle/:vid')
.get((req, res) => {
  Vehicle.findById(req.params.vid, (err, vehicle) => {
    if(err) res.send(err);
    else res.json(vehicle);
  });
});

// Start server
app.listen(port);

console.log(`Server is listening at ${port}`);