// contains the api endpoints for the Boat Tour

var Timeslots = require('../timeslots.js');
var Boats = require('../boats.js');

module.exports = {
  createTimeslots: (req, res) => {
    var start = req.body['timeslot[start_time]'],
        duration = req.body['timeslot[duration]'];

    var newTimeslot = new Timeslots.create(start, duration);

    // convert start time to date format
    var date = new Date(start * 1000),
        year = date.getUTCFullYear(),
        month = date.getUTCMonth()+1,
        day = date.getUTCDate();
    var formattedDate = year + '-' + month + '-' + day;

    Timeslots.byId[newTimeslot.id] = newTimeslot;
    Timeslots.byDate[formattedDate] = newTimeslot;

    res.send(newTimeslot);
  },

  getTimeslots: (req, res) => {
    var date = req.params;
    console.log('date', date);
  },

  createBoat: (req, res) => {
    var capacity = req.body['boat[capacity]'],
        name = req.body['boat[name]'];

    var newBoat = new Boats.create(capacity, name);
    
    Boats.byId[newBoat.id] = newBoat;

    res.send(newBoat);

  },

  listBoat: (req, res) => {

  },

  assignBoatToTimeSlot: (req, res) => {
    var timeslotId = req.body['assignment[timeslot_id]'],
        boatId = req.body['assignment[boat_id]'];

    // find the timeslot in Timeslots
    var boat = Boats.byId[boatId],
        timeslot = Timeslots.byId[timeslotId];

    timeslot.boats.push(boat);

    res.sendStatus(200);
  },

  createBooking: (req, res) => {

  }
}














