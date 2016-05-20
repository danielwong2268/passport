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
