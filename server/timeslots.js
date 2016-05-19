var Timeslot = {
  byId: {},
  byDate: {},
  create: ( () => {
    var count = 1;
    return function(startTime, duration) {
      this.start_time = startTime;
      this.id = 'timeslot' + count;
      this.boats = [];
      this.availability = 0;
      this.customer_count = 0;
      count++;
    }
  })()

}

module.exports = Timeslot;