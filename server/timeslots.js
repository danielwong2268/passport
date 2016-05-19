



var Timeslot = {
  byId: {},
  byDate: {},
  create: ( () => {
    var count = 1;
    var timeslot = function(startTime, duration) {
      this.start_time = startTime;
      this.duration = duration;
      this.id = 'timeslot' + count;
      this.boats = [];
      this.availability = 0;
      this.customer_count = 0;
      count++;
    }

    // when you insert a new boat, availability is re-calculated
    timeslot.prototype.setAvailability = function(val) {
      this.availability = Math.max(val, this.availability);
    }

    return timeslot;
  })()
}




module.exports = Timeslot;




// to book:
// loop through boats array. 
  // find the smallest possible value for group
  // look up that value in the capacity hash table, take it out.
    // if that was max, then recalculate max by looping through HT


// do we even need a hash table to store capacity?
  // without one, to find max:
  // store max
  // if max is ever booked, then recalculate max


