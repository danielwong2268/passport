// contains the api endpoints for the Boat Tour

var Timeslots = require('../timeslots.js');

module.exports = {
  createTimeslots: (req, res) => {
    var start = req.body['timeslot[start_time]'];
    var duration = req.body['timeslot[duration]'];

    var timeSlot = new Timeslots.create(start, duration);

    // convert start time to date format
    var date = new Date(start * 1000),
        year = date.getUTCFullYear(),
        month = date.getUTCMonth()+1,
        day = date.getUTCDate();
    var formattedDate = year + '-' + month + '-' + day;

    Timeslots.byId[timeSlot.id] = timeSlot;
    Timeslots.byDate[formattedDate] = timeSlot;

    res.send(timeSlot);
  },

  getTimeslots: (req, res) => {
    var date = req.params;
    console.log('date', date);
  },

  createBoat: (req, res) => {
    var capacity = req.body['boat[capacity]'];
    var name = req.body['boat[name]'];

  },

  listBoat: (req, res) => {

  },

  assignBoatToTimeSlot: (req, res) => {

  },

  createBooking: (req, res) => {

  }
}