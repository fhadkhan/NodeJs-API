const express = require('express');
let router = express.Router();

// Models ////////////////////////////////////////////////////////////////////////////
let Vehicle = require('../models/vehicle');

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

module.exports = router;