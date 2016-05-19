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
        month = date.getUTCMonth()+1 < 10 ? '0' + (date.getUTCMonth()+1) : date.getUTCMonth()+1;
        day = date.getUTCDate() < 10 ? '0' + date.getUTCDate() : date.getUTCDate();
    var formattedDate = year + '-' + month + '-' + day;

    Timeslots.byId[newTimeslot.id] = newTimeslot;

    if (typeof Timeslots.byDate[formattedDate] === 'undefined') {
      Timeslots.byDate[formattedDate] = [newTimeslot];
    } else {
      Timeslots.byDate[formattedDate].push(newTimeslot);
    }

    res.send(newTimeslot);
  },

  getTimeslots: (req, res) => {
    var date = req.query.date;

    var timeslots = Timeslots.byDate[date];


    res.send(timeslots);
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

    timeslot.boats.push(boat.id);

    // calculate the new availability
    timeslot.setAvailability(boat.capacity);

    res.sendStatus(200);
  },

  createBooking: (req, res) => {

    console.log('req.body', req.body);
    var timeslotId = req.body['booking[timeslot_id]'],
        bookingSize = req.body['booking[size]'];



    // expect timeslot_id and size
    // var timeslot = Timeslots.byId[]

    // for (var i = 0; i < timeslot.boats.length; i++) {
    //   timeslot.boats[i]
    // }



  }
}









