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
    var capacity = +req.body['boat[capacity]'],
        name = req.body['boat[name]'];

    var newBoat = new Boats.create(capacity, name);
    
    Boats.byId[newBoat.id] = newBoat;

    res.send(newBoat);

  },

  listBoat: (req, res) => {
    var boats = [];
    for (var id in Boats.byId) {
      boats.push(Boats.byId[id]);
    }
    res.send(boats);
  },

  assignBoatToTimeSlot: (req, res) => {

    var timeslotId = req.body['assignment[timeslot_id]'],
        boatId = req.body['assignment[boat_id]'];

    // find the timeslot in Timeslots
    var boat = Boats.byId[boatId],
        timeslot = Timeslots.byId[timeslotId];

    // store boat in timeslot, and timeslot in the boat
    timeslot.boats.push(boat.id);
    timeslot.activeBoats[boat.id] = boatId;
    boat.timeslots[timeslot.id] = timeslotId;

    // calculate the new availability at that given timeslot
    timeslot.availability = Math.max(boat.capacity, timeslot.availability);

    res.sendStatus(200);
  },

  createBooking: (req, res) => {
    var timeslotId = req.body['booking[timeslot_id]'],
        bookingSize = +req.body['booking[size]'];

    var timeslot = Timeslots.byId[timeslotId],
        boat,
        minDiff;

    // find the smallest boat that can fit the booking group
    for (var i = 0; i < timeslot.boats.length; i++) {
      var diff = Boats.byId[timeslot.boats[i]].capacity - bookingSize;
      if (diff >= 0) {
        if (typeof minDiff === 'undefined' || diff < minDiff) {
          minDiff = diff;
          boat = Boats.byId[timeslot.boats[i]];
        }
      }
    }

    // if no boat is found, then don't book anything and return an error message
    if (typeof boat === 'undefined') {
      res.status(500).send({error: 'We cannot accomodate this boat at this time'});
      return;
    }

    var boatCapacity = boat.capacity;

    boat.capacity -= bookingSize;
    timeslot.customer_count += bookingSize;

    // if the largest boat is booked, recalculate the new availability.
    if (boatCapacity === timeslot.availability) {
      timeslot.setAvailability();
    }

    // check for time conflicts, in the case the boat is booked in multiple time slots
    for (var boatTS_Id in boat.timeslots) {
      var timeslot2 = Timeslots.byId[boatTS_Id];
      if (boatTS_Id !== timeslotId) {
        var largerStart = Math.max(timeslot2.start_time, timeslot.start_time);
        var smallerEnd = Math.min(timeslot2.start_time + 60 * timeslot2.duration,
                                  timeslot.start_time + 60 * timeslot.duration);

        // if there is a time conflict, then edit the timeslot (timeslot2)
        if (smallerEnd > largerStart) {
          // remove the boat from activeBoats
          delete timeslot2.activeBoats[boat.id];
          // recalculate availability if needed
          if (timeslot2.availability === boatCapacity) {
            timeslot2.setAvailability();
          }
        }
      }
    }

    console.log('timeslots', Timeslots);
    res.sendStatus(200);
  }




}









