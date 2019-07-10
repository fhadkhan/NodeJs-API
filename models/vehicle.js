const mongooes = require('mongoose');

let Schema = mongooes.Schema;

let VehicleSchema = new Schema({
    name: String,
    year: Number,
    price: Number
});

module.exports = mongooes.model('Vehicle', VehicleSchema);