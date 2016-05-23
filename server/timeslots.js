var Boats = require('./boats.js');

var Timeslot = {
  byId: {},
  byDate: {},
  create: ( () => {
    var count = 1;
    var timeslot = function(startTime, duration) {
      this.start_time = startTime; // seconds
      this.duration = duration;    // minutes
      this.id = 'timeslot' + count;
      this.boats = []; // stored as ids
      this.activeBoats = {};
      this.availability = 0;
      this.customer_count = 0;
      count++;
    }

    // when you insert a new boat, availability is re-calculated
    timeslot.prototype.setAvailability = function() {
      var max = 0;
      for (var boatId in this.activeBoats) {
        max = Math.max(Boats.byId[this.activeBoats[boatId]].capacity, max);
      }
      this.availability = max;
    }

    return timeslot;
  })()
}

module.exports = Timeslot;



// boats array contains all boats
// activeBoats array contains all boats that are active.
// calculate the availability from the activeBoat array
  // Array or Object?


// remove the boat from active boats
// if that boat's capacity is equal to the availbility, recalc avail.

